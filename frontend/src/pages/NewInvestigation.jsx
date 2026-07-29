import Sidebar from "../components/Sidebar";
import SearchCard from "../components/SearchCard";

export default function NewInvestigation() {
    return (
        <div className="relative flex min-h-screen bg-[#08111F] overflow-hidden">

            <div className="absolute top-[-300px] left-[350px] w-[700px] h-[700px] rounded-full bg-blue-700 opacity-20 blur-[180px]" />
            <div className="absolute bottom-[-250px] right-[-100px] w-[500px] h-[500px] rounded-full bg-cyan-500 opacity-10 blur-[150px]" />

            <Sidebar />

            <main className="flex-1 relative z-10 overflow-auto px-12 pb-12">

                <div className="py-10">
                    <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-2">Fact-Check Agent</p>
                    <h1 className="text-5xl font-bold text-white">New Investigation</h1>
                    <p className="text-gray-400 mt-3 text-lg">
                        Paste an Arabic claim, news headline, or social media post below.
                    </p>
                </div>

                <div className="flex justify-center">
                    <SearchCard />
                </div>

            </main>
        </div>
    );
}
