import React from "react"
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom"
import imageUrl from "/assets/images/avatar-icon.png"

export default function Header(){
    const [loggedIn, setLoggedIn] = React.useState(localStorage.getItem("loggedin") !== null)
    const location = useLocation()
    const navigate = useNavigate()

    React.useEffect(() => {
        setLoggedIn(localStorage.getItem("loggedin") !== null)
    }, [location])

    const inlineStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    function logOut(){
        localStorage.removeItem("loggedin")
        setLoggedIn(false)
        navigate("/")
    }

    return(
        <header>
            <Link className="site-logo" to="/">#VanLife</Link>
            <nav>
                <NavLink 
                    to="/host"
                    style={({isActive}) => isActive ? inlineStyles : null}>Host
                </NavLink>
                <NavLink 
                    to="/about"
                    style={({isActive}) => isActive ? inlineStyles : null}>About
                </NavLink>
                <NavLink 
                    to="/vans"
                    style={({isActive}) => isActive ? inlineStyles : null}>Vans
                </NavLink>
                <Link to="login" className="login-link">
                    <img src={imageUrl} className="login-icon" />
                </Link>
                {loggedIn ? <button onClick={logOut}>Log Out</button> : null}
            </nav>
        </header>
    )
}