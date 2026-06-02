import React from "react"
import { Link, useSearchParams } from "react-router-dom"
import { getVans } from "../api.js"

export default function Vans(){
    const [searchParams, setSearchParams] = useSearchParams()
    const [vans, setVans] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    const typeFilter = searchParams.get("type")

    React.useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try {
                const data = await getVans()
                setVans(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        loadVans()
    }, [])

    if (loading) {
        return <h1 aria-live="polite">Loading...</h1>
    }
    if (error) {
        return <h1 aria-live="assertive">There was an error: {error.message}</h1>
    }

    const searchVans = typeFilter 
    ? vans.filter(van => van.type === typeFilter) 
    : vans

    if (!searchVans) {
        return <h1 aria-live="assertive">There was an error: Failed to fetch vans</h1>
    }

    const vanElements = searchVans.map(van => (
        <div key={van.id} className="van-tile">
            <Link to={van.id} state={{ search: `?${searchParams.toString()}`, type: typeFilter }}>
                <img src={van.imageUrl}/>
                <div className="van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}<span>/day</span></p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
    ))

    function filterChange(key, value){
        setSearchParams(prevParams => {
            if(value === null){
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }

    return (
        <div className="van-list-container">
            <h1>Explore our Van options</h1>
            <div className="van-list-filter-buttons">
                <button
                    onClick={() => filterChange("type", "simple")}
                    className={`van-type simple ${typeFilter === "simple" ? "selected" : ""}`}
                >Simple</button>
                <button
                    onClick={() => filterChange("type", "luxury")}
                    className={`van-type luxury ${typeFilter === "luxury" ? "selected" : ""}`}
                >Luxury</button>
                <button
                    onClick={() => filterChange("type", "rugged")}
                    className={`van-type rugged ${typeFilter === "rugged" ? "selected" : ""}`}
                >Rugged</button>

                {typeFilter ? (
                    <button
                        onClick={() => filterChange("type", null)}
                        className="van-type clear-filters"
                    >Clear filter</button>
                ) : null}
            </div>

            <div className="van-list">
                {vanElements}
            </div>
        </div>
    )
}