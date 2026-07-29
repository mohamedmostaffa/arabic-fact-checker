import { Routes, Route } from "react-router-dom";

import Home               from "./pages/Home";
import Result             from "./pages/Result";
import History            from "./pages/History";
import Analytics          from "./pages/Analytics";
import Settings           from "./pages/Settings";
import NewInvestigation   from "./pages/NewInvestigation";

export default function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Home />}
            />

            <Route
                path="/result"
                element={<Result />}
            />
            <Route
                path="/history"
                element={<History />}
            />
            <Route
                path="/analytics"
                element={<Analytics />}
            />
            <Route
                path="/settings"
                element={<Settings />}
            />
            <Route
                path="/investigate"
                element={<NewInvestigation />}
            />

        </Routes>

    );

}