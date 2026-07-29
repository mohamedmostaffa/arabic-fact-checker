import { useState } from "react";
import {
    Settings as SettingsIcon, Key, Globe, BrainCircuit,
    Bell, Shield, Moon, ChevronRight, Check, Save
} from "lucide-react";
import Sidebar from "../components/Sidebar";

const SECTIONS = ["AI Provider", "Search & Sources", "Notifications", "Privacy & Security", "Appearance"];

export default function Settings() {
    const [activeSection, setActiveSection] = useState("AI Provider");
    const [saved, setSaved]                 = useState(false);
    const [provider, setProvider]           = useState("gemini");
    const [searchProvider, setSearchProvider] = useState("tavily");
    const [darkMode, setDarkMode]           = useState(true);
    const [emailNotif, setEmailNotif]       = useState(false);
    const [apiKeys, setApiKeys]             = useState({
        gemini:    "",
        groq:      "",
        anthropic: "",
        tavily:    "",
    });

    function handleSave() {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    }

    return (
        <div className="relative flex min-h-screen bg-[#08111F] overflow-hidden">

            <div className="absolute top-[-300px] left-[350px] w-[700px] h-[700px] rounded-full bg-blue-700 opacity-20 blur-[180px]" />
            <div className="absolute bottom-[-250px] right-[-100px] w-[500px] h-[500px] rounded-full bg-cyan-500 opacity-10 blur-[150px]" />

            <Sidebar />

            <main className="flex-1 relative z-10 overflow-auto px-12 pb-12 pt-2">

                <div className="py-10">
                    <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-2">Configuration</p>
                    <h1 className="text-5xl font-bold text-white">Settings</h1>
                    <p className="text-gray-400 mt-3 text-lg">Configure your AI providers, API keys, and preferences.</p>
                </div>

                <div className="flex gap-8">

                    <nav className="w-64 flex-shrink-0">
                        <div className="rounded-3xl bg-[#101B31] border border-[#22324B] p-3 space-y-1">
                            {SECTIONS.map(s => (
                                <button
                                    key={s}
                                    onClick={() => setActiveSection(s)}
                                    className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl text-left transition-all duration-200 ${
                                        activeSection === s
                                            ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20"
                                            : "text-gray-400 hover:bg-[#16243A] hover:text-white"
                                    }`}
                                >
                                    <span className="font-medium text-sm">{s}</span>
                                    {activeSection === s && <ChevronRight size={15}/>}
                                </button>
                            ))}
                        </div>
                    </nav>

                    <div className="flex-1 space-y-6">

                        {activeSection === "AI Provider" && (
                            <>
                                <Section icon={<BrainCircuit size={20}/>} title="LLM Provider">
                                    <p className="text-gray-400 text-sm mb-5">Choose which AI model powers the fact-checking agent.</p>
                                    <div className="grid grid-cols-3 gap-4">
                                        {[
                                            { id: "gemini",    label: "Gemini",   free: true,  note: "Default — free" },
                                            { id: "groq",      label: "Groq",     free: true,  note: "Fast inference" },
                                            { id: "anthropic", label: "Anthropic", free: false, note: "Requires billing" },
                                        ].map(p => (
                                            <button
                                                key={p.id}
                                                onClick={() => setProvider(p.id)}
                                                className={`rounded-2xl border p-5 text-left transition-all duration-200 ${
                                                    provider === p.id
                                                        ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20"
                                                        : "border-[#22324B] bg-[#132238] hover:border-blue-500/40"
                                                }`}
                                            >
                                                <div className="flex items-center justify-between mb-3">
                                                    <span className="text-white font-semibold">{p.label}</span>
                                                    {provider === p.id && (
                                                        <span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                                                            <Check size={12} className="text-white"/>
                                                        </span>
                                                    )}
                                                </div>
                                                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${p.free ? "bg-green-500/15 text-green-400" : "bg-amber-500/15 text-amber-400"}`}>
                                                    {p.free ? "Free" : "Paid"}
                                                </span>
                                                <p className="text-gray-500 text-xs mt-2">{p.note}</p>
                                            </button>
                                        ))}
                                    </div>
                                </Section>

                                <Section icon={<Key size={20}/>} title="API Keys">
                                    <p className="text-gray-400 text-sm mb-5">
                                        You only need to fill in the key for the provider you selected above.
                                    </p>
                                    <div className="space-y-4">
                                        {[
                                            { id: "gemini",    label: "Gemini API Key",    placeholder: "AIza..." },
                                            { id: "groq",      label: "Groq API Key",      placeholder: "gsk_..." },
                                            { id: "anthropic", label: "Anthropic API Key", placeholder: "sk-ant-..." },
                                            { id: "tavily",    label: "Tavily Search Key", placeholder: "tvly-..." },
                                        ].map(k => (
                                            <div key={k.id}>
                                                <label className="text-gray-300 text-sm font-medium block mb-1.5">{k.label}</label>
                                                <input
                                                    type="password"
                                                    value={apiKeys[k.id]}
                                                    onChange={e => setApiKeys(prev => ({ ...prev, [k.id]: e.target.value }))}
                                                    placeholder={k.placeholder}
                                                    className="w-full bg-[#0D1929] border border-[#22324B] rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </Section>
                            </>
                        )}

                        {activeSection === "Search & Sources" && (
                            <Section icon={<Globe size={20}/>} title="Web Search Provider">
                                <p className="text-gray-400 text-sm mb-5">Select the search engine used to fetch external evidence.</p>
                                <div className="grid grid-cols-3 gap-4">
                                    {[
                                        { id: "tavily",  label: "Tavily",   note: "AI-optimised search" },
                                        { id: "serpapi", label: "SerpAPI",  note: "Google Search API" },
                                        { id: "mock",    label: "Mock",     note: "Offline / testing" },
                                    ].map(sp => (
                                        <button
                                            key={sp.id}
                                            onClick={() => setSearchProvider(sp.id)}
                                            className={`rounded-2xl border p-5 text-left transition-all duration-200 ${
                                                searchProvider === sp.id
                                                    ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20"
                                                    : "border-[#22324B] bg-[#132238] hover:border-blue-500/40"
                                            }`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-white font-semibold">{sp.label}</span>
                                                {searchProvider === sp.id && (
                                                    <span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                                                        <Check size={12} className="text-white"/>
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-gray-500 text-xs">{sp.note}</p>
                                        </button>
                                    ))}
                                </div>
                            </Section>
                        )}

                        {activeSection === "Notifications" && (
                            <Section icon={<Bell size={20}/>} title="Notification Preferences">
                                <Toggle
                                    label="Email notifications"
                                    description="Receive a summary email after each investigation."
                                    value={emailNotif}
                                    onChange={setEmailNotif}
                                />
                                <Toggle
                                    label="In-app alerts"
                                    description="Show alerts inside the app when a high-risk claim is detected."
                                    value={true}
                                    onChange={() => {}}
                                />
                            </Section>
                        )}

                        {activeSection === "Privacy & Security" && (
                            <Section icon={<Shield size={20}/>} title="Privacy & Security">
                                <Toggle
                                    label="Save investigation history"
                                    description="Store past results in localStorage for the History page."
                                    value={true}
                                    onChange={() => {}}
                                />
                                <Toggle
                                    label="Anonymise claims before sending"
                                    description="Strip personally identifiable information before querying the AI."
                                    value={false}
                                    onChange={() => {}}
                                />
                                <div className="mt-6 pt-6 border-t border-[#22324B]">
                                    <button className="px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-semibold hover:bg-red-500/20 transition-colors">
                                        Clear All Saved History
                                    </button>
                                </div>
                            </Section>
                        )}

                        {activeSection === "Appearance" && (
                            <Section icon={<Moon size={20}/>} title="Appearance">
                                <Toggle
                                    label="Dark mode"
                                    description="Use the dark theme (always recommended for TruthLens)."
                                    value={darkMode}
                                    onChange={setDarkMode}
                                />
                                <div className="mt-6">
                                    <p className="text-gray-300 text-sm font-medium mb-3">Accent colour</p>
                                    <div className="flex gap-3">
                                        {["#3B82F6","#06B6D4","#8B5CF6","#10B981","#F59E0B"].map(c => (
                                            <button
                                                key={c}
                                                className="w-9 h-9 rounded-full border-2 border-transparent hover:border-white transition-all"
                                                style={{ background: c }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </Section>
                        )}

                        <div className="flex justify-end">
                            <button
                                onClick={handleSave}
                                className={`flex items-center gap-2 px-8 py-3.5 rounded-2xl font-semibold text-white transition-all duration-300 ${
                                    saved
                                        ? "bg-green-600 shadow-lg shadow-green-500/30"
                                        : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-blue-500/30"
                                }`}
                            >
                                {saved ? <Check size={18}/> : <Save size={18}/>}
                                {saved ? "Saved!" : "Save Changes"}
                            </button>
                        </div>

                    </div>

                </div>

            </main>
        </div>
    );
}

function Section({ icon, title, children }) {
    return (
        <div className="rounded-3xl bg-[#101B31] border border-[#22324B] p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-7">
                <span className="text-blue-400">{icon}</span>
                <h2 className="text-white text-lg font-bold">{title}</h2>
            </div>
            {children}
        </div>
    );
}

function Toggle({ label, description, value, onChange }) {
    return (
        <div className="flex items-start justify-between py-4 border-b border-[#1B2A45] last:border-0">
            <div className="pr-8">
                <p className="text-white font-medium text-sm">{label}</p>
                <p className="text-gray-500 text-xs mt-1">{description}</p>
            </div>
            <button
                onClick={() => onChange(!value)}
                className={`relative w-12 h-6 rounded-full flex-shrink-0 transition-colors duration-300 ${value ? "bg-blue-500" : "bg-[#22324B]"}`}
            >
                <span
                    className="absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300"
                    style={{ transform: value ? "translateX(26px)" : "translateX(4px)" }}
                />
            </button>
        </div>
    );
}
