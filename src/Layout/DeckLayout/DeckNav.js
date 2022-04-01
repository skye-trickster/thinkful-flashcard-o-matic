import React from "react"
import {Link} from "react-router-dom"

function NavLink({name, to, className="", disabled=false}) {
    
    const style = disabled ? {"pointerEvents":"none"} : {}
    const colorOverride = disabled ? "text-secondary" : ""
    return <Link to={to} style={style} className={`${className} ${colorOverride}`}>{name}</Link>
}

function DeckNav ({id="", deck=""}) {

    const link = (path, name) => {return {"path": path, "name": name, "disabled": false}}

    const getNav = () => {
        /// TODO: get the navigation by going BACKWARDS in the location, stopping at decks.
        
        const links = []

        if (deck) { links.push(link(`/decks/${id}`, deck))}
        
        links[links.length - 1] = {
            ...links[links.length - 1],
            disabled: true //disable the final link
        }

        return links
    }

    return (
        <div className="bg-light p-3 mb-2">
            <NavLink name="Home" to="/" className="bi-house-door-fill"/> 
            {getNav().map(({name, path, disabled}, index) => ( <span key={index}> / <NavLink name={name} to={path} disabled={disabled} /></span>))}
        </div>
    )
}

export default DeckNav