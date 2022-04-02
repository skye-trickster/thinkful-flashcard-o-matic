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

        let links = []

        pathitems.forEach((pathNode, index) => {

            const getPath = (pullid = false) => {
                const pullAmount = pullid ? 1 : 0
                return `${pathitems.slice(0, index + 1 + pullAmount).join("/")}`
            }

            switch(pathNode)
            {
                case "decks":
                    links.push(createLink(getPath(true), deck))
                    break;
                case "edit":
                    links.push(createLink(getPath(), "Edit"))
                    break;
                default:
                    break;
            }
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