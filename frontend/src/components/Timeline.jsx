import { motion } from "framer-motion";
import {
    Search,
    Globe,
    ShieldCheck,
    Brain,
    FileCheck
} from "lucide-react";

export default function Timeline() {

    const steps = [

        {
            icon: Search,
            title: "Searching",
            description: "Searching trusted news websites..."
        },

        {
            icon: Globe,
            title: "Collecting Sources",
            description: "Gathering evidence from reliable sources..."
        },

        {
            icon: ShieldCheck,
            title: "Credibility Analysis",
            description: "Evaluating credibility scores..."
        },

        {
            icon: Brain,
            title: "AI Reasoning",
            description: "Analyzing and comparing information..."
        },

        {
            icon: FileCheck,
            title: "Report Generated",
            description: "Final report is ready."
        }

    ];

    return (

        <div className="rounded-3xl border border-[#22324B] bg-gradient-to-b from-[#101B31] to-[#0B1527] p-8 shadow-2xl">

            <h2 className="text-white text-3xl font-bold mb-8">

                Investigation Timeline

            </h2>

            <div className="space-y-6">

                {

                    steps.map((step, index) => {

                        const Icon = step.icon;

                        return (

                            <motion.div

                                key={index}

                                initial={{
                                    opacity: 0,
                                    x: -30
                                }}

                                animate={{
                                    opacity: 1,
                                    x: 0
                                }}

                                transition={{
                                    delay: index * 0.2
                                }}

                                className="flex items-start gap-5"

                            >

                                <div className="relative">

                                    <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">

                                        <Icon
                                            size={24}
                                            className="text-blue-400"
                                        />

                                    </div>

                                    {

                                        index !== steps.length - 1 &&

                                        <div className="absolute left-1/2 top-14 -translate-x-1/2 w-[2px] h-10 bg-[#22324B]" />

                                    }

                                </div>

                                <div className="flex-1">

                                    <div className="flex justify-between items-center">

                                        <h3 className="text-white text-xl font-semibold">

                                            {step.title}

                                        </h3>

                                        <span className="text-green-400 text-sm">

                                            ✓ Completed

                                        </span>

                                    </div>

                                    <p className="text-gray-400 mt-2 leading-7">

                                        {step.description}

                                    </p>

                                </div>

                            </motion.div>

                        );

                    })

                }

            </div>

        </div>

    );

}