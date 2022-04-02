import React from "react"
import {Link, useLocation} from "react-router-dom"

function NavLink({name, to, className="", disabled=false}) {
    
    const style = disabled ? {"pointerEvents":"none"} : {}
    const colorOverride = disabled ? "text-secondary" : ""
    return <Link to={to} style={style} className={`${className} ${colorOverride}`}>{name}</Link>
}

function DeckNav ({id="", deck=""}) {
    const {pathname} = useLocation()

    const createLink = (path, name) => {return {"path": path, "name": name, "disabled": false}}

    const getNav = () => {
        const pathitems = pathname.split('/')

        const links = []
        pathitems.reverse().forEach((pathNode, index) => {

            const getPath = (next = false) => pathitems.slice(0, next ? index + 1 : index).reverse().join('/')

            if(pathNode === "") return
            
            if(pathNode === "decks")
                links.push(createLink(getPath(true), deck))
        })

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