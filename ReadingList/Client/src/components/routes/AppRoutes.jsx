import { Routes, Route } from "react-router-dom";

import Login from "../../pages/LoginPage";
import Register from "../../pages/RegisterPage";
import DashBoardPage from "../../pages/DashBoardPage";
import AuthPage from "../../pages/AuthPage";


function AppRoutes() {


    return (

        <Routes>


            {/* 
                Root route.

                When user visits:
                /

                React displays AuthPage.

                AuthPage contains:
                - Login form
                - Register form
            */}
            <Route
                path="/"
                element={<AuthPage />}
            />



            /*
                Dashboard route.

                When user visits:
                /dashboard

                React displays DashboardPage.

                This page contains:
                - Navbar
                - Add book form
                - Book list
            */
            <Route
                path="/dashboard"
                element={<DashBoardPage />}
            />


        </Routes>

    );

}


export default AppRoutes;