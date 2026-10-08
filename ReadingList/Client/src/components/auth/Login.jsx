// React Hook used to store and update component state.
import { useState } from "react";

// API function that sends the login request.
import { login } from "../../api/authApi";

// React Router hook used for page navigation.
import { useNavigate } from "react-router-dom";

function Login() {

    // Allows us to navigate to another route
    // after a successful login.
    const navigate = useNavigate();


    // -----------------------------
    // Form State
    // -----------------------------
    // Stores the values entered into the login form.
    //
    // loginData always represents the current
    // state of the form.
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });


    // Stores validation or API error messages.
    const [error, setError] = useState("");


    // Prevents multiple submissions while
    // waiting for the backend to respond.
    const [isLoading, setIsLoading] = useState(false);


    // -----------------------------
    // Update Form Inputs
    // -----------------------------
    //
    // Runs every time the user types
    // into an input.
    //
    // event.target.name tells us which
    // input changed.
    //
    // event.target.value contains
    // the new value.
    //
    // Spread (...) keeps the existing
    // values while only updating the
    // changed field.
    function handleChange(event) {

        setLoginData({

            ...loginData,

            [event.target.name]: event.target.value

        });

    }


    // -----------------------------
    // Handle Form Submission
    // -----------------------------
    async function handleSubmit(event) {

        // Prevent the browser from refreshing
        // the page when the form submits.
        event.preventDefault();


        // Clear previous errors before
        // attempting another login.
        setError("");


        // Basic client-side validation.
        //
        // If either field is empty,
        // stop the login process.
        if (!loginData.email || !loginData.password) {

            setError("Please fill in all fields");

            return;

        }


        // Disable button and show loading text.
        setIsLoading(true);


        try {

            // Send login request to backend.
            const data = await login(loginData);


            // Save JWT token so future requests
            // can authenticate the user.
            localStorage.setItem(
                "token",
                data.token
            );


            // Redirect user to dashboard.
            navigate("/dashboard");

        }

        catch (error) {

            // Display backend error message.
            setError(error.message);

        }

        finally {

            // Runs whether login succeeds
            // or fails.
            //
            // Re-enable the button.
            setIsLoading(false);

        }

    }


    // -----------------------------
    // UI
    // -----------------------------
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

                    <label>

                        Email

                    </label>

                    <input

                        className="form-input"

                        name="email"

                        type="email"

                        autoComplete="username"

                        placeholder="Enter your email"

                        // Value always comes from state.
                        value={loginData.email}

                        // Update state when typing.
                        onChange={handleChange}

                    />

                </div>


                <div className="form-group">

                    <label>

                        Password

                    </label>

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


                {/* Only display the error if one exists. */}
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

                    {/* Show different text while waiting */}
                    {isLoading

                        ? "Logging in..."

                        : "Login"

                    }

                </button>

            </form>

        </div>

    );

}

export default Login;