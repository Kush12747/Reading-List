import { useState } from "react";
import { login } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function handleChange(event) {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value
        });
    }

    async function handleSubmit(event) {

        event.preventDefault();

        setError("");

        if (!loginData.email || !loginData.password) {
            setError("Please fill in all fields");
            return;
        }

        setIsLoading(true);

        try {

            const data = await login(loginData);

            localStorage.setItem("token", data.token);

            navigate("/dashboard");

        } catch (error) {

            setError(error.message);

        } finally {

            setIsLoading(false);

        }
    }

    return (

        <div className="auth-form">

            <h2 className="form-title">
                Welcome Back
            </h2>

            <form
                className="form"
                onSubmit={handleSubmit}
            >

                <div className="form-group">

                    <label>Email</label>

                    <input
                        className="form-input"
                        name="email"
                        type="email"
                        autoComplete="username"
                        placeholder="Enter your email"
                        value={loginData.email}
                        onChange={handleChange}
                    />

                </div>

                <div className="form-group">

                    <label>Password</label>

                    <input
                        className="form-input"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={handleChange}
                    />

                </div>

                {error &&
                    <p className="form-error">
                        {error}
                    </p>
                }

                <button
                    className="primary-button"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>

            </form>

        </div>

    );
}

export default Login;