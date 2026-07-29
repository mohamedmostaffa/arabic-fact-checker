import FeatureCard from "./FeatureCard";

import {

    ShieldCheck,

    Scale,

    FileText

} from "lucide-react";

export default function Features(){

    return(

        <div className="

        grid

        grid-cols-3

        gap-8

        mt-10

        ">

            <FeatureCard

                icon={<ShieldCheck color="#22C55E" size={35}/>}

                color="#22C55E"

                title="Reliable Sources"

                description="We search trusted news agencies and official sources before making any decision."

            />

            <FeatureCard

                icon={<Scale color="#9333EA" size={35}/>}

                color="#9333EA"

                title="Fair Analysis"

                description="Every claim is analysed objectively using AI and credibility scores."

            />

            <FeatureCard

                icon={<FileText color="#F97316" size={35}/>}

                color="#F97316"

                title="Clear Reports"

                description="Receive transparent reports with verdict, evidence and confidence."

            />

        </div>

    )

}