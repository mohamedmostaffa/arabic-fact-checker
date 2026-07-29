import { useState } from "react";
import {
    Search,
    History,
    BarChart3,
    Settings,
    Calendar,
    ShieldCheck,
    PanelLeftClose,
    PanelLeftOpen,
    User
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    const history = JSON.parse(localStorage.getItem("truthlens-history")) || [];

    const todayStr = new Date().toDateString();
    const todayCount = history.filter(
        (h) => h.date && new Date(h.date).toDateString() === todayStr
    ).length;

    const avgConfidence =
        history.length === 0
            ? 0
            : Math.round(
                  history.reduce((sum, h) => sum + (h["Ù†Ø³Ø¨Ø©_Ø§Ù„Ø«Ù‚Ø©"] ?? h.confidence ?? 0), 0) /
                      history.length
              );

    const activeSection =
        pathname === "/history"
            ? "history"
            : pathname === "/analytics"
              ? "analytics"
              : pathname === "/settings"
                ? "settings"
                : "investigate";

    return (
        <aside
            style={{
                width: collapsed ? "64px" : "260px",
                minWidth: collapsed ? "64px" : "260px",
                transition: "width 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            className="h-screen bg-gradient-to-b from-[#09111F] to-[#101B30] border-r border-[#1B2A45] flex flex-col justify-between overflow-hidden"
        >
            <div className="flex flex-col justify-between h-full" style={{ padding: collapsed ? "20px 10px" : "20px" }}>
                <div className="flex-1 overflow-y-auto pr-0" style={{ scrollbarWidth: "none" }}>
                    <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"}`}>
                        <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
                            <div className="w-11 h-11 flex-shrink-0 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/40">
                                <ShieldCheck size={24} className="text-white" />
                            </div>

                            <div
                                style={{
                                    opacity: collapsed ? 0 : 1,
                                    width: collapsed ? 0 : "auto",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    transition: "opacity 0.25s ease, width 0.35s ease",
                                }}
                            >
                                <h1 className="text-white text-xl font-bold">TruthLens</h1>
                                <p className="text-gray-400 text-xs">AI Investigation Center</p>
                            </div>
                        </div>

                        {!collapsed && (
                            <button
                                onClick={() => setCollapsed(true)}
                                className="w-9 h-9 flex-shrink-0 rounded-xl bg-[#18263B] hover:bg-blue-600 transition-colors flex items-center justify-center"
                                title="Collapse sidebar"
                            >
                                <PanelLeftClose size={18} className="text-white" />
                            </button>
                        )}
                    </div>

                    {collapsed && (
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={() => setCollapsed(false)}
                                className="w-9 h-9 flex-shrink-0 rounded-xl bg-[#18263B] hover:bg-blue-600 transition-colors flex items-center justify-center"
                                title="Expand sidebar"
                            >
                                <PanelLeftOpen size={18} className="text-white" />
                            </button>
                        </div>
                    )}

                    <nav className="mt-7 space-y-1.5">
                        <MenuItem
                            icon={<Search size={18} />}
                            text="New Investigation"
                            active={activeSection === "investigate"}
                            collapsed={collapsed}
                            onClick={() => navigate("/investigate")}
                        />

                        <MenuItem
                            icon={<History size={18} />}
                            text="History"
                            active={activeSection === "history"}
                            collapsed={collapsed}
                            onClick={() => navigate("/history")}
                        />

                        <MenuItem
                            icon={<BarChart3 size={18} />}
                            text="Analytics"
                            active={activeSection === "analytics"}
                            collapsed={collapsed}
                            onClick={() => navigate("/analytics")}
                        />

                        <MenuItem
                            icon={<Settings size={18} />}
                            text="Settings"
                            active={activeSection === "settings"}
                            collapsed={collapsed}
                            onClick={() => navigate("/settings")}
                        />
                    </nav>

                    <div
                        style={{
                            opacity: collapsed ? 0 : 1,
                            maxHeight: collapsed ? 0 : "220px",
                            overflow: "hidden",
                            transition: "opacity 0.25s ease, max-height 0.35s ease",
                        }}
                        className="mt-7 space-y-3"
                    >
                        <InfoCard
                            icon={<Calendar size={17} />}
                            title="Investigations Today"
                            value={todayCount}
                            color="blue"
                        />
                        <InfoCard
                            icon={<BarChart3 size={17} />}
                            title="Average Confidence"
                            value={history.length === 0 ? "-" : `${avgConfidence}%`}
                            color="green"
                        />
                    </div>
                </div>

                <div className="flex-shrink-0 border-t border-[#22324B] pt-4">
                    <div className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
                        <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">
                            <User size={19} className="text-white" />
                        </div>

                        <div
                            style={{
                                opacity: collapsed ? 0 : 1,
                                width: collapsed ? 0 : "auto",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                transition: "opacity 0.25s ease, width 0.35s ease",
                            }}
                        >
                            <h3 className="text-white text-sm font-semibold">Mohamed</h3>
                            <p className="text-gray-400 text-xs">AI Investigator</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}

function MenuItem({ icon, text, active, onClick, collapsed }) {
    return (
        <div className="relative group">
            <button
                onClick={onClick}
                className={`
                    w-full flex items-center gap-3
                    ${collapsed ? "justify-center px-0 py-3" : "px-4 py-3"}
                    rounded-xl transition-all duration-300
                    ${
                        active
                            ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30"
                            : "text-gray-400 hover:bg-[#16243A] hover:text-white"
                    }
                `}
                title={collapsed ? text : undefined}
            >
                <span className="flex-shrink-0">{icon}</span>

                <span
                    style={{
                        opacity: collapsed ? 0 : 1,
                        width: collapsed ? 0 : "auto",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        transition: "opacity 0.2s ease, width 0.3s ease",
                    }}
                    className="font-medium text-sm"
                >
                    {text}
                </span>
            </button>

            {collapsed && (
                <div className="
                    absolute left-full top-1/2 -translate-y-1/2 ml-3
                    bg-[#1B2A45] text-white text-sm font-medium
                    px-3 py-1.5 rounded-lg whitespace-nowrap
                    opacity-0 group-hover:opacity-100 pointer-events-none
                    transition-opacity duration-200 z-50
                    border border-[#2A3F5F] shadow-xl
                ">
                    {text}
                </div>
            )}
        </div>
    );
}

function InfoCard({ icon, title, value, color }) {
    const glow =
        color === "green"
            ? "shadow-green-500/20"
            : "shadow-blue-500/20";

    return (
        <div className={`bg-[#132238] rounded-2xl p-4 border border-[#22324B] shadow-xl ${glow}`}>
            <div className="flex items-center gap-2.5 text-gray-300">
                {icon}
                <span className="text-xs leading-tight">{title}</span>
            </div>
            <h2 className="text-white text-3xl font-bold mt-3">{value}</h2>
        </div>
    );
}
