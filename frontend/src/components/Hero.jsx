import { Search } from "lucide-react";

export default function Hero() {
    return (
        <div className="w-full flex flex-col items-center pt-14 px-10">

            <div className="flex items-center gap-4">

                <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/40">

                    <Search size={34} color="white" />

                </div>

                <div>

                    <h1 className="text-6xl font-bold text-white">

                        TruthLens <span className="text-blue-500">AI</span>

                    </h1>

                    <p className="text-gray-400 text-xl mt-2">

                        Investigate Before You Believe

                    </p>

                </div>

            </div>

        </div>
    );
}