import {
    ShieldCheck,
    AlertTriangle,
    XCircle
} from "lucide-react";

export default function VerdictCard({
    verdict,
    explanation
}) {

    const config = getVerdictConfig(verdict);

    return (

        <div className="relative overflow-hidden rounded-3xl border border-[#22324B] bg-gradient-to-b from-[#101B31] to-[#0B1527] p-8 shadow-2xl">

            <div
                className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-20"
                style={{
                    background: config.color
                }}
            />

            <div className="relative flex items-center gap-5">

                <div
                    className="w-20 h-20 rounded-3xl flex items-center justify-center border"
                    style={{
                        background: config.color + "22",
                        borderColor: config.color + "66"
                    }}
                >

                    <config.icon
                        size={40}
                        color={config.color}
                    />

                </div>

                <div>

                    <p className="text-gray-400 text-sm uppercase tracking-widest">

                        Investigation Verdict

                    </p>

                    <h2
                        className="text-5xl font-bold mt-2"
                        style={{
                            color: config.color
                        }}
                    >

                        {config.title}

                    </h2>

                </div>

            </div>

            <div className="h-px bg-[#22324B] my-8" />

            <div>

                <h3 className="text-white text-2xl font-semibold">

                    Why?

                </h3>

                <p className="text-gray-300 leading-8 text-lg mt-4">

                    {explanation}

                </p>

            </div>

            <div className="mt-10 flex gap-4 flex-wrap">

                <Tag text="AI Verified" />

                <Tag text="Trusted Sources" />

                <Tag text="Credibility Checked" />

            </div>

        </div>

    );

}

function Tag({ text }) {

    return (

        <div className="px-4 py-2 rounded-full bg-[#17243A] border border-[#29415F] text-gray-300 text-sm">

            {text}

        </div>

    );

}

function getVerdictConfig(verdict) {

    switch (verdict.toLowerCase()) {

        case "true":

        case "correct":

            return {
                title: "TRUE",
                color: "#22C55E",
                icon: ShieldCheck
            };

        case "misleading":

            return {
                title: "MISLEADING",
                color: "#F59E0B",
                icon: AlertTriangle
            };

        case "false":

            return {
                title: "FALSE",
                color: "#EF4444",
                icon: XCircle
            };

        default:

            return {
                title: verdict,
                color: "#3B82F6",
                icon: ShieldCheck
            };

    }

}