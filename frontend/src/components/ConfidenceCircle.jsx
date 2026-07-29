import { motion } from "framer-motion";

export default function ConfidenceCircle({ confidence }) {

    const color =
        confidence >= 80
            ? "#22C55E"
            : confidence >= 60
            ? "#F59E0B"
            : "#EF4444";

    const radius = 90;
    const circumference = 2 * Math.PI * radius;
    const offset =
        circumference - (confidence / 100) * circumference;

    return (

        <div className="rounded-3xl border border-[#22324B] bg-gradient-to-b from-[#101B31] to-[#0B1527] p-8 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden">

            <div
                className="absolute w-72 h-72 rounded-full blur-3xl opacity-20"
                style={{
                    background: color
                }}
            />

            <h3 className="relative text-white text-2xl font-bold mb-8">

                Confidence

            </h3>

            <div className="relative w-[230px] h-[230px]">

                <svg
                    className="absolute inset-0 -rotate-90"
                    width="230"
                    height="230"
                >

                    <circle
                        cx="115"
                        cy="115"
                        r={radius}
                        stroke="#23344D"
                        strokeWidth="14"
                        fill="none"
                    />

                    <motion.circle
                        cx="115"
                        cy="115"
                        r={radius}
                        stroke={color}
                        strokeWidth="14"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{
                            strokeDashoffset: circumference
                        }}
                        animate={{
                            strokeDashoffset: offset
                        }}
                        transition={{
                            duration: 1.3
                        }}
                    />

                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">

                    <span
                        className="text-6xl font-bold"
                        style={{
                            color
                        }}
                    >

                        {confidence}

                    </span>

                    <span className="text-gray-400 text-xl">

                        %

                    </span>

                </div>

            </div>

            <div className="relative mt-8 w-full">

                <div className="flex justify-between text-sm text-gray-500">

                    <span>Low</span>

                    <span>Medium</span>

                    <span>High</span>

                </div>

                <div className="mt-3 h-2 rounded-full bg-[#23344D] overflow-hidden">

                    <motion.div
                        initial={{
                            width: 0
                        }}
                        animate={{
                            width: `${confidence}%`
                        }}
                        transition={{
                            duration: 1.3
                        }}
                        className="h-full rounded-full"
                        style={{
                            background: color
                        }}
                    />

                </div>

            </div>

        </div>

    );

}