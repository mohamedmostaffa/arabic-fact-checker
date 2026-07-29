import { motion } from "framer-motion";

export default function FeatureCard({
    icon,
    title,
    description,
    color
}) {

    return (

        <motion.div

            whileHover={{
                y: -8,
                scale: 1.03
            }}

            transition={{
                duration: 0.25
            }}

            className="

            relative

            overflow-hidden

            rounded-3xl

            border

            border-[#22395F]

            bg-gradient-to-b

            from-[#101B31]

            to-[#0C1628]

            p-8

            shadow-2xl

            hover:border-blue-500/60

            hover:shadow-blue-500/20

            transition-all

            duration-300

            "

        >

            <div

                className="absolute -top-10 -right-10 w-36 h-36 rounded-full blur-3xl opacity-20"

                style={{

                    background: color

                }}

            />

            <div

                className="

                relative

                w-16

                h-16

                rounded-2xl

                flex

                items-center

                justify-center

                border

                "

                style={{

                    background: color + "22",

                    borderColor: color + "55"

                }}

            >

                {icon}

            </div>

            <h2 className="relative text-white text-2xl font-bold mt-7">

                {title}

            </h2>

            <p className="relative text-gray-400 mt-4 leading-7">

                {description}

            </p>

            <div

                className="relative mt-8 h-1 rounded-full"

                style={{

                    background: color,

                    width: 80

                }}

            />

        </motion.div>

    );

}