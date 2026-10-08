import { Routes, Route } from "react-router-dom";
import Login from "../../pages/LoginPage";
import Register from "../../pages/RegisterPage";
import DashBoardPage from "../../pages/DashBoardPage";
import AuthPage from "../../pages/AuthPage";

function AppRoutes() {
    return (

        <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/dashboard" element={<DashBoardPage />} />
        </Routes>
    )
}

export default AppRoutes;