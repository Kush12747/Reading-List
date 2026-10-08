import RegisterForm from "../components/auth/Register";
import "../styles/AuthPage.css";

function RegisterPage() {
    return (
        <main className="auth-page">

            <div className="background-orb orb-1"></div>
            <div className="background-orb orb-2"></div>
            <div className="background-grid"></div>

            <section className="auth-card">

                <header className="auth-header">
                    <h1>Create Account</h1>

                    <p>
                        Start your reading journey by creating your personal
                        reading list account.
                    </p>
                </header>

                <div className="auth-form-container">
                    <RegisterForm />
                </div>

            </section>

        </main>
    );
}

export default RegisterPage;