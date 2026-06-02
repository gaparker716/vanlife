import { NavLink, Outlet } from "react-router-dom"

export default function HostLayout() {
    const inlineStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    return (
        <>
            <nav className="host-nav">
                <NavLink
                    to="."
                    end
                    style={({ isActive }) => isActive ? inlineStyles : null}>Dashboard
                </NavLink>

                <NavLink
                    to="income"
                    style={({ isActive }) => isActive ? inlineStyles : null}>Income
                </NavLink>
                
                <NavLink
                    to="vans"
                    style={({ isActive }) => isActive ? inlineStyles : null}>Vans
                </NavLink>
                <NavLink
                    to="reviews"
                    style={({ isActive }) => isActive ? inlineStyles : null}>Reviews
                </NavLink>
            </nav>
            <Outlet />
        </>
    )
}