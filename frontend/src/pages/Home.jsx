import Sidebar from "../components/Sidebar";
import Hero from "../components/Hero";
import SearchCard from "../components/SearchCard";
import Features from "../components/Features";

export default function Home() {

    return (

        <div className="relative flex min-h-screen bg-[#08111F] overflow-hidden">

            <div className="absolute top-[-300px] left-[350px] w-[700px] h-[700px] rounded-full bg-blue-700 opacity-20 blur-[180px]" />

            <div className="absolute bottom-[-250px] right-[-100px] w-[500px] h-[500px] rounded-full bg-cyan-500 opacity-10 blur-[150px]" />

            <Sidebar />

            <main className="flex-1 relative z-10 overflow-auto px-12 pb-12">

                <Hero/>

                <div className="flex justify-center">

                    <SearchCard/>

                </div>

                <Features/>

            </main>

        </div>

    );

}