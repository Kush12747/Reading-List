import { useState } from "react";

import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

import "../styles/AuthPage.css";


function AuthPage() {


    // Controls which authentication form is visible.
    //
    // true  = show Login form
    // false = show Register form
    //
    const [showLogin, setShowLogin] = useState(true);



    return (


        <main className="auth-page">


            {/* Decorative background elements controlled by CSS */}
            <div className="background-orb orb-1"></div>

            <div className="background-orb orb-2"></div>

            <div className="background-grid"></div>





            <section className="auth-card">



                {/* Page introduction */}
                <header className="auth-header">


                    <h1>
                        Personal Reading List
                    </h1>


                    <p>
                        Organize your books, track your progress, and never
                        lose your next great read.
                    </p>


                </header>






                {/* 
                    Tabs allow the user to switch
                    between Login and Register.

                    The active class changes styling.
                */}
                <div className="auth-tabs">


                    <button

                        className={
                            showLogin
                            ? "tab active"
                            : "tab"
                        }


                        // Changes state to display Login.
                        onClick={() => setShowLogin(true)}

                    >

                        Login

                    </button>





                    <button

                        className={
                            !showLogin
                            ? "tab active"
                            : "tab"
                        }


                        // Changes state to display Register.
                        onClick={() => setShowLogin(false)}

                    >

                        Register

                    </button>


                </div>






                <div className="auth-form-container">


                    {
                        /*
                            Conditional rendering.

                            If showLogin is true:
                                Render Login component

                            Otherwise:
                                Render Register component
                        */
                    }


                    {showLogin ? (

                        <Login />

                    ) : (

                        <Register

                            // After successful registration,
                            // switch back to login screen.
                            onRegisterSuccess={() =>
                                setShowLogin(true)
                            }

                        />

                    )}


                </div>



            </section>



        </main>

    );

}


export default AuthPage;