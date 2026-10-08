import { useState } from "react";
import { register } from "../../api/authApi";

function Register({ onRegisterSuccess }) {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function handleChange(event) {

        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });

    }

    async function handleSubmit(event) {

        event.preventDefault();

        setError("");

        if (!formData.name || !formData.email || !formData.password) {

            setError("Please fill in all fields");
            return;

        }

        setIsLoading(true);

        try {

            await register(formData);

            onRegisterSuccess();

        }
        catch (error) {

            setError(error.message);

        }
        finally {

            setIsLoading(false);

        }
    }

    return (

        <div className="auth-form">

            <h2 className="form-title">
                Create Account
            </h2>

            <form
                className="form"
                onSubmit={handleSubmit}
            >

                <div className="form-group">

                    <label>Name</label>

                    <input
                        className="form-input"
                        name="name"
                        type="text"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                </div>

                <div className="form-group">

                    <label>Email</label>

                    <input
                        className="form-input"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                </div>

                <div className="form-group">

                    <label>Password</label>

                    <input
                        className="form-input"
                        name="password"
                        type="password"
                        placeholder="Create a password"
                        value={formData.password}
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
                    {isLoading
                        ? "Creating Account..."
                        : "Create Account"}
                </button>

            </form>

        </div>

    );

}

export default Register;