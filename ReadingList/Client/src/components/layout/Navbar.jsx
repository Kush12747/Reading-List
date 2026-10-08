import { useNavigate, NavLink } from "react-router-dom";
import "../../styles/NavBar.css";


function Navbar() {

    const navigate = useNavigate();


    // Logs the user out by removing the stored JWT token
    // and redirecting them back to the login page.
    function handleLogout() {

        localStorage.removeItem("token");

        navigate("/");

    }


    return (

        <nav className="navbar">


            {/* Application logo/title */}
            <div className="navbar-brand">

                <NavLink to="/dashboard">
                    Personal Reading List
                </NavLink>

            </div>



            <div className="navbar-links">


                {/* 
                    NavLink automatically knows the current route.
                    isActive lets us add styling to the active page.
                */}
                <NavLink
                    to="/dashboard"
                    className={({isActive}) =>
                        isActive
                        ? "nav-link active"
                        : "nav-link"
                    }
                >
                    Dashboard
                </NavLink>



                {/* Calls logout function when clicked */}
                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>


            </div>


        </nav>

    );

}


export default Navbar;