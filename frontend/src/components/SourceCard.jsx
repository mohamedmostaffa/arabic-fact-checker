import {
    Globe,
    ShieldCheck,
    ExternalLink
} from "lucide-react";

export default function SourceCard({ source }) {

    const score = source.credibility ?? 0;

    const color =
        score >= 80
            ? "#22C55E"
            : score >= 60
            ? "#F59E0B"
            : "#EF4444";

    return (

        <div className="group relative overflow-hidden rounded-3xl border border-[#22324B] bg-gradient-to-b from-[#101B31] to-[#0B1527] p-6 transition-all duration-300 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-600/20">

            <div
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20"
                style={{
                    background: color
                }}
            />

            <div className="relative flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <div className="w-12 h-12 rounded-2xl bg-[#18253B] border border-[#29415F] flex items-center justify-center">

                        <Globe
                            size={22}
                            className="text-blue-400"
                        />

                    </div>

                    <div>

                        <h3 className="text-white font-semibold text-lg">

                            {source.name}

                        </h3>

                        <p className="text-gray-500 text-sm">

                            {source.domain}

                        </p>

                    </div>

                </div>

                {

                    source.url &&

                    <a

                        href={source.url}

                        target="_blank"

                        rel="noreferrer"

                        className="text-gray-500 hover:text-white transition"

                    >

                        <ExternalLink size={18}/>

                    </a>

                }

            </div>

            <div className="mt-8">

                <div className="flex justify-between mb-2">

                    <span className="text-gray-400">

                        Credibility

                    </span>

                    <span
                        className="font-bold"
                        style={{
                            color
                        }}
                    >

                        {score}%

                    </span>

                </div>

                <div className="h-3 rounded-full bg-[#22324B] overflow-hidden">

                    <div

                        className="h-full rounded-full transition-all duration-700"

                        style={{
                            width: `${score}%`,
                            background: color
                        }}

                    />

                </div>

            </div>

            <div className="mt-8 flex items-center justify-between">

                <div className="flex items-center gap-2 text-gray-300">

                    <ShieldCheck
                        size={18}
                        style={{
                            color
                        }}
                    />

                    <span className="text-sm">

                        Trusted Source

                    </span>

                </div>

                <span
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                        background: color + "22",
                        color
                    }}
                >

                    {
                        score >= 80
                            ? "High"
                            : score >= 60
                                ? "Medium"
                                : "Low"
                    }

                </span>

            </div>

        </div>

    );

}