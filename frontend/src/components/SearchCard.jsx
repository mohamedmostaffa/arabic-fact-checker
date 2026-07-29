import { useState } from "react";
import { Search, Sparkles, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function SearchCard({ autoFocus = false }) {

    const [claim, setClaim] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function startInvestigation() {

        if (!claim.trim()) {

            alert("Please enter a claim.");

            return;

        }

        try {

            setLoading(true);

            const response = await api.post("/check", {
                claim: claim
            });

            sessionStorage.setItem(
                "truthlens-report",
                JSON.stringify(response.data)
            );
            const history =
                JSON.parse(localStorage.getItem("truthlens-history")) || [];

            const entry = { ...response.data, date: new Date().toISOString() };
            history.unshift(entry);

            localStorage.setItem(
                "truthlens-history",
                JSON.stringify(history)
            );
            navigate("/result");

        } catch (err) {

            console.error(err);

            alert("Failed to connect to the backend.");

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="relative w-full max-w-5xl mt-12">

            <div className="absolute inset-0 rounded-[32px] bg-blue-600/20 blur-3xl" />

            <div className="relative bg-gradient-to-b from-[#101B31] to-[#0B1527] border border-[#22395F] rounded-[32px] p-10 backdrop-blur-xl shadow-2xl">

                <div className="flex flex-col items-center">

                    <div className="w-20 h-20 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-500/30">

                        <Search
                            size={38}
                            className="text-blue-400"
                        />

                    </div>

                    <h1 className="text-white text-5xl font-bold mt-8">

                        Start Investigation

                    </h1>

                    <p className="text-gray-400 text-lg mt-4 max-w-2xl text-center leading-8">

                        Paste an Arabic claim, news article or statement.
                        TruthLens AI will search trusted sources,
                        evaluate credibility and generate a transparent report.

                    </p>

                    <textarea

                        id="claim-input"

                        value={claim}

                        onChange={(e) => setClaim(e.target.value)}

                        rows={8}

                        autoFocus={autoFocus}

                        placeholder="اكتب الادعاء هنا..."

                        className="mt-10 w-full bg-[#162338] rounded-3xl border border-[#29415F] p-6 text-lg text-white resize-none outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 placeholder:text-gray-500"

                    />

                    <div className="w-full flex justify-between items-center mt-3">

                        <span className="text-gray-500">

                            {claim.length} / 2000

                        </span>

                        <span className="text-blue-400 flex items-center gap-2">

                            <Sparkles size={16} />

                            AI Ready

                        </span>

                    </div>

                    <button

                        onClick={startInvestigation}

                        disabled={loading}

                        className="mt-8 w-full h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-xl font-semibold text-white shadow-xl shadow-blue-600/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-500/50 disabled:opacity-60 disabled:cursor-not-allowed"

                    >

                        {

                            loading ?

                            <div className="flex justify-center items-center gap-3">

                                <Loader2 className="animate-spin"/>

                                Investigating...

                            </div>

                            :

                            "🔎 Start Investigation"

                        }

                    </button>

                    <p className="text-gray-500 text-sm mt-5">

                        Your investigation uses AI and trusted online sources.

                    </p>

                </div>

            </div>

        </div>

    );

}