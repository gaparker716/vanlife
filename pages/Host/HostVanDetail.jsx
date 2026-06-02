import React from "react"
import { useParams, Link, NavLink, Outlet } from "react-router-dom"
import { getVan } from "../../api"

export default function HostVanDetail() {
    const inlineStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    const { id } = useParams()
    const [van, setVan] = React.useState(null)

    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try {
                //DISCLAIMER: Using this function out of laziness. This app doesn't have any editing functionality so it's fine for now
                //In the real world I would have a seperate getHostVan function in api.js that has user authentication
                const data = await getVan(id) 
                setVan(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadVans()
    }, [id])

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }

    if (!van) {
        return <h1>There was an error: Could not fetch van details</h1>
    }

    return (
        <section>
            <Link
                to=".."
                relative="path"
                className="back-button"
            >&larr; <span>Back to all vans</span></Link> 

            <div className="host-van-detail-layout-container">
                <div className="host-van-detail">
                    <img src={van.imageUrl} />
                    <div className="host-van-detail-info-text">
                        <i className={`van-type van-type-${van.type}`}>
                            {van.type}
                        </i>
                        <h3>{van.name}</h3>
                        <h4>${van.price}/day</h4>
                    </div>
                </div>

                <nav className="host-van-detail-nav">
                    <NavLink to="." end
                    style={({ isActive }) => isActive ? inlineStyles : null}>Details
                    </NavLink>
                    <NavLink to="pricing"
                    style={({ isActive }) => isActive ? inlineStyles : null}>Pricing
                    </NavLink>
                    <NavLink to="photos"
                    style={({ isActive }) => isActive ? inlineStyles : null}>Photos
                    </NavLink>
                </nav>
                <Outlet context={{ van }} />
            </div>
        </section>
    )
}