import { useState } from "react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import "../styles/AuthPage.css";

function AuthPage() {
    
    const [showLogin, setShowLogin] = useState(true);

    return (
        <main className="auth-page">

            <div className="background-orb orb-1"></div>
            <div className="background-orb orb-2"></div>
            <div className="background-grid"></div>

            <section className="auth-card">

                <header className="auth-header">
                    <h1>Personal Reading List</h1>

                    <p>
                        Organize your books, track your progress, and never
                        lose your next great read.
                    </p>
                </header>

                <div className="auth-tabs">

                    <button
                        className={showLogin ? "tab active" : "tab"}
                        onClick={() => setShowLogin(true)}
                    >
                        Login
                    </button>

                    <button
                        className={!showLogin ? "tab active" : "tab"}
                        onClick={() => setShowLogin(false)}
                    >
                        Register
                    </button>

                </div>

                <div className="auth-form-container">

                    {showLogin ? (
                        <Login />
                    ) : (
                        <Register
                            onRegiserSuccess={() => setShowLogin(true)}
                        />
                    )}

                </div>

            </section>

        </main>
    );
}

export default AuthPage;