import Login from "../components/auth/Login";
import "../styles/AuthPage.css";

function LoginPage() {
    return (
        <main className="auth-page">

            <div className="background-orb orb-1"></div>
            <div className="background-orb orb-2"></div>
            <div className="background-grid"></div>

            <section className="auth-card">

                <header className="auth-header">
                    <h1>Personal Reading List</h1>

                    <p>
                        Welcome back! Sign in to continue building and managing
                        your personal library.
                    </p>
                </header>

                <div className="auth-form-container">
                    <Login />
                </div>

            </section>

        </main>
    );
}

export default LoginPage;