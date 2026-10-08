import { useNavigate, NavLink } from "react-router-dom";
import "../../styles/NavBar.css";

function Navbar() {

    const navigate = useNavigate();


    function handleLogout() {

        localStorage.removeItem("token");

        navigate("/");

    }


    return (

        <nav className="navbar">

            <div className="navbar-brand">

                <NavLink to="/dashboard">
                    Personal Reading List
                </NavLink>

            </div>


            <div className="navbar-links">

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