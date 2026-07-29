import { Navigate } from "react-router-dom";

import VerdictCard from "../components/VerdictCard";
import ConfidenceCircle from "../components/ConfidenceCircle";
import Timeline from "../components/Timeline";
import SourceCard from "../components/SourceCard";

export default function Result() {

    const saved = sessionStorage.getItem("truthlens-report");

    if (!saved) {

        return <Navigate to="/" replace />;

    }

    const report = JSON.parse(saved);

    return (

        <div className="min-h-screen bg-[#08111F] p-10">

            <div className="max-w-7xl mx-auto">

                <div className="mb-10">

                    <h1 className="text-5xl font-bold text-white">

                        Investigation Result

                    </h1>

                    <p className="text-gray-400 mt-3 text-lg">

                        AI generated investigation report.

                    </p>

                </div>

                <div className="mb-10 rounded-3xl bg-[#101B31] border border-[#22324B] p-6">

                    <p className="text-gray-400 text-sm">

                        Claim

                    </p>

                    <h2 className="text-white text-2xl mt-2">

                        {report.claim}

                    </h2>

                </div>

                <div className="grid grid-cols-3 gap-8">

                    <div className="col-span-2">

                        <VerdictCard

                            verdict={report.verdict}

                            explanation={report.summary}

                        />

                    </div>

                    <ConfidenceCircle

                        confidence={report.confidence}

                    />

                </div>

                <div className="mt-10">

                    <Timeline />

                </div>

                <div className="mt-12">

                    <h2 className="text-white text-3xl font-bold mb-6">

                        Trusted Sources

                    </h2>

                    <div className="grid grid-cols-3 gap-6">

                        {

                            report.sources.map((source, index) => (

                                <SourceCard

                                    key={index}

                                    source={source}

                                />

                            ))

                        }

                    </div>

                </div>

            </div>

        </div>

    );

}