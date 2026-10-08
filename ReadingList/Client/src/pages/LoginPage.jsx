import Login from "../components/auth/Login";
import "../styles/AuthPage.css";


function LoginPage() {


    return (


        <main className="auth-page">


            {/* 
                Decorative background elements.

                These do not affect application logic.
                They are only controlled by CSS.
            */}
            <div className="background-orb orb-1"></div>

            <div className="background-orb orb-2"></div>

            <div className="background-grid"></div>





            <section className="auth-card">



                {/* 
                    Page-specific information.

                    The Login component only handles
                    the form itself.
                */}
                <header className="auth-header">


                    <h1>
                        Personal Reading List
                    </h1>


                    <p>
                        Welcome back! Sign in to continue building and managing
                        your personal library.
                    </p>


                </header>





                <div className="auth-form-container">


                    {/* 
                        Reusable Login component.

                        Login handles:
                        - email/password state
                        - validation
                        - API request
                        - storing JWT token
                        - redirecting user
                    */}
                    <Login />


                </div>



            </section>



        </main>


    );

}


export default LoginPage;