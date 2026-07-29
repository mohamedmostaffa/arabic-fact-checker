import { useNavigate } from "react-router-dom";
import { BarChart3, TrendingUp, ShieldCheck, AlertTriangle, XCircle, Globe, Calendar, Activity } from "lucide-react";
import Sidebar from "../components/Sidebar";

function getHistory() {
    return JSON.parse(localStorage.getItem("truthlens-history")) || [];
}

function verdictKey(v = "") {
    const s = (v || "").toString().trim();
    if (s === "صحيح"     || s.toLowerCase() === "true"        || s.toLowerCase() === "correct")    return "true";
    if (s === "مضلل"     || s.toLowerCase() === "misleading")                                       return "misleading";
    if (s === "مُفبرك"   || s.toLowerCase() === "false"       || s.toLowerCase() === "fabricated") return "false";
    if (s === "غير مؤكد" || s.toLowerCase() === "unverified"  || s.toLowerCase() === "unconfirmed") return "unconfirmed";
    return "unconfirmed";
}

function getConfidence(item) {
    return item["نسبة_الثقة"] ?? item.confidence ?? 0;
}

function getVerdict(item) {
    return item["الحكم"] ?? item.verdict ?? "";
}

function buildWeekly(history) {
    const days = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        days.push({ label: d.toLocaleDateString("en", { weekday: "short" }), date: d.toDateString(), count: 0 });
    }
    history.forEach((h) => {
        if (!h.date) return;
        const ds = new Date(h.date).toDateString();
        const slot = days.find((d) => d.date === ds);
        if (slot) slot.count++;
    });
    return days;
}

function buildTopSources(history) {
    const map = {};
    history.forEach((h) => {
        const sources = [
            ...(h["المصادر_المؤيدة"] ?? h.supporting_sources ?? []),
            ...(h["المصادر_المفندة"] ?? h.refuting_sources   ?? []),
        ];
        sources.forEach((s) => {
            const domain = s.domain || s.name || "Unknown";
            if (!map[domain]) map[domain] = { name: domain, checks: 0, credSum: 0, credCount: 0 };
            map[domain].checks++;
            if (s.credibility != null) { map[domain].credSum += s.credibility; map[domain].credCount++; }
        });
    });
    return Object.values(map)
        .sort((a, b) => b.checks - a.checks)
        .slice(0, 5)
        .map((s) => ({
            name: s.name,
            checks: s.checks,
            credibility: s.credCount > 0 ? Math.round(s.credSum / s.credCount) : null,
        }));
}

export default function Analytics() {
    const history    = getHistory();
    const weeklyData = buildWeekly(history);
    const topSources = buildTopSources(history);

    const verdictCounts = { true: 0, misleading: 0, false: 0, unconfirmed: 0 };
    history.forEach((h) => { verdictCounts[verdictKey(getVerdict(h))]++; });

    const verdictData = [
        { label: "True",        count: verdictCounts.true,        color: "#22C55E", icon: ShieldCheck   },
        { label: "Misleading",  count: verdictCounts.misleading,  color: "#F59E0B", icon: AlertTriangle },
        { label: "False",       count: verdictCounts.false,       color: "#EF4444", icon: XCircle       },
        { label: "Unconfirmed", count: verdictCounts.unconfirmed, color: "#3B82F6", icon: ShieldCheck   },
    ];

    const totalChecks   = history.length;
    const avgConfidence = totalChecks === 0 ? 0 : Math.round(history.reduce((s, h) => s + getConfidence(h), 0) / totalChecks);
    const maxWeekly     = Math.max(...weeklyData.map((d) => d.count), 1);

    const todayStr   = new Date().toDateString();
    const todayCount = history.filter((h) => h.date && new Date(h.date).toDateString() === todayStr).length;

    return (
        <div className="relative flex min-h-screen bg-[#08111F] overflow-hidden">

            <div className="absolute top-[-300px] left-[350px] w-[700px] h-[700px] rounded-full bg-blue-700 opacity-20 blur-[180px]" />
            <div className="absolute bottom-[-250px] right-[-100px] w-[500px] h-[500px] rounded-full bg-cyan-500 opacity-10 blur-[150px]" />

            <Sidebar />

            <main className="flex-1 relative z-10 overflow-auto px-12 pb-12 pt-2">

                <div className="py-10">
                    <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-2">Overview</p>
                    <h1 className="text-5xl font-bold text-white">Analytics</h1>
                    <p className="text-gray-400 mt-3 text-lg">Real-time fact-checking stats from your investigation history.</p>
                </div>

                {totalChecks === 0 ? (
                    <div className="flex flex-col items-center justify-center mt-32 text-center">
                        <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mb-6">
                            <BarChart3 size={36} className="text-blue-400" />
                        </div>
                        <h2 className="text-white text-2xl font-bold">No investigations yet</h2>
                        <p className="text-gray-400 mt-3">Run your first fact-check to see real analytics here.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-4 gap-6 mb-10">
                            <KpiCard icon={<Activity size={22}/>}      label="Total Checks"       value={totalChecks}                              color="blue"  />
                            <KpiCard icon={<ShieldCheck size={22}/>}   label="Verified True"      value={verdictCounts.true}                      color="green" />
                            <KpiCard icon={<AlertTriangle size={22}/>} label="Misleading / False" value={verdictCounts.misleading + verdictCounts.false} color="amber" />
                            <KpiCard icon={<TrendingUp size={22}/>}    label="Avg Confidence"     value={`${avgConfidence}%`}                     color="cyan"  />
                        </div>

                        <div className="grid grid-cols-5 gap-8 mb-10">

                            <div className="col-span-2 rounded-3xl bg-[#101B31] border border-[#22324B] p-8 shadow-xl">
                                <h2 className="text-white text-xl font-bold mb-6">Verdict Breakdown</h2>
                                <DonutChart data={verdictData} total={totalChecks} />
                                <div className="mt-8 space-y-3">
                                    {verdictData.map((d) => (
                                        <div key={d.label} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: d.color }} />
                                                <span className="text-gray-300 text-sm">{d.label}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-24 h-1.5 rounded-full bg-[#1B2A45] overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full"
                                                        style={{ width: `${totalChecks ? (d.count / totalChecks) * 100 : 0}%`, background: d.color }}
                                                    />
                                                </div>
                                                <span className="text-white text-sm font-semibold w-6 text-right">{d.count}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="col-span-3 rounded-3xl bg-[#101B31] border border-[#22324B] p-8 shadow-xl">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-white text-xl font-bold">Weekly Activity</h2>
                                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                                        <Calendar size={15}/>
                                        <span>Last 7 days</span>
                                    </div>
                                </div>
                                <div className="flex items-end gap-3 h-44">
                                    {weeklyData.map((d) => {
                                        const pct = (d.count / maxWeekly) * 100;
                                        return (
                                            <div key={d.label} className="flex-1 flex flex-col items-center gap-2 group">
                                                <span className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {d.count}
                                                </span>
                                                <div className="w-full rounded-t-xl overflow-hidden flex items-end" style={{ height: "120px", background: "#1B2A45" }}>
                                                    <div
                                                        className="w-full rounded-t-xl transition-all duration-500"
                                                        style={{
                                                            height: `${Math.max(pct, d.count > 0 ? 4 : 0)}%`,
                                                            background: "linear-gradient(to top, #2563EB, #06B6D4)",
                                                        }}
                                                    />
                                                </div>
                                                <span className="text-gray-400 text-xs">{d.label}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                                <p className="text-gray-500 text-sm mt-4">
                                    Today: <span className="text-blue-400 font-semibold">{todayCount}</span> investigation{todayCount !== 1 ? "s" : ""}
                                </p>
                            </div>

                        </div>

                        {topSources.length > 0 && (
                            <div className="rounded-3xl bg-[#101B31] border border-[#22324B] p-8 shadow-xl">
                                <div className="flex items-center gap-3 mb-7">
                                    <Globe size={22} className="text-blue-400"/>
                                    <h2 className="text-white text-xl font-bold">Top Referenced Sources</h2>
                                </div>
                                <div className="space-y-5">
                                    {topSources.map((src, i) => (
                                        <div key={src.name} className="flex items-center gap-6">
                                            <span className="text-gray-500 text-sm w-4">{i + 1}</span>
                                            <span className="text-white font-semibold w-36 truncate">{src.name}</span>
                                            <div className="flex-1 h-2 rounded-full bg-[#1B2A45] overflow-hidden">
                                                <div
                                                    className="h-full rounded-full transition-all duration-700"
                                                    style={{
                                                        width: `${(src.checks / topSources[0].checks) * 100}%`,
                                                        background: "linear-gradient(to right, #2563EB, #06B6D4)",
                                                    }}
                                                />
                                            </div>
                                            <span className="text-gray-400 text-sm w-20 text-right">{src.checks} ref{src.checks !== 1 ? "s" : ""}</span>
                                            {src.credibility != null && (
                                                <span
                                                    className="text-xs font-bold px-3 py-1 rounded-full"
                                                    style={{
                                                        color:       src.credibility >= 80 ? "#22C55E" : "#F59E0B",
                                                        background:  src.credibility >= 80 ? "#22C55E22" : "#F59E0B22",
                                                    }}
                                                >
                                                    {src.credibility}% cred.
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}

            </main>
        </div>
    );
}

function KpiCard({ icon, label, value, color }) {
    const colors = {
        blue:  { text: "text-blue-400",  bg: "bg-blue-500/10",  border: "border-blue-500/20"  },
        green: { text: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
        amber: { text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
        cyan:  { text: "text-cyan-400",  bg: "bg-cyan-500/10",  border: "border-cyan-500/20"  },
    };
    const c = colors[color];
    return (
        <div className={`rounded-2xl bg-[#101B31] border ${c.border} p-6 shadow-lg`}>
            <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center mb-4 ${c.text}`}>
                {icon}
            </div>
            <p className="text-gray-400 text-sm">{label}</p>
            <p className={`text-4xl font-bold mt-1 ${c.text}`}>{value}</p>
        </div>
    );
}

function DonutChart({ data, total }) {
    const size   = 160;
    const r      = 58;
    const cx     = size / 2;
    const cy     = size / 2;
    const stroke = 22;
    const circ   = 2 * Math.PI * r;

    let offset = 0;
    const slices = data.map((d) => {
        const pct   = total ? d.count / total : 0;
        const dash  = pct * circ;
        const gap   = circ - dash;
        const slice = { ...d, dash, gap, offset };
        offset += dash;
        return slice;
    });

    return (
        <div className="flex justify-center">
            <svg width={size} height={size} className="-rotate-90">
                <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1B2A45" strokeWidth={stroke} />
                {slices.map((s) => (
                    <circle
                        key={s.label}
                        cx={cx} cy={cy} r={r}
                        fill="none"
                        stroke={s.color}
                        strokeWidth={stroke}
                        strokeDasharray={`${s.dash} ${s.gap}`}
                        strokeDashoffset={-s.offset}
                        strokeLinecap="butt"
                    />
                ))}
                <text x={cx} y={cy - 6}  textAnchor="middle" fill="white"   fontSize="22" fontWeight="bold" transform={`rotate(90,${cx},${cy})`}>{total}</text>
                <text x={cx} y={cy + 14} textAnchor="middle" fill="#6B7280" fontSize="11"                   transform={`rotate(90,${cx},${cy})`}>total</text>
            </svg>
        </div>
    );
}
