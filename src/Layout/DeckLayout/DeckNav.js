import React from "react"
import {Link, useLocation} from "react-router-dom"

function NavLink({name, to, className="", disabled=false}) {
    
    const colorOverride = disabled ? "disabled" : "text-primary"
    return <Link to={to} className={`p-0 mr-1 ml-1 btn ${className} ${colorOverride}`}>{name}</Link>
}

function DeckNav ({id="", deck=""}) {
    const {pathname} = useLocation()

    const createLink = (path, name) => {return {"path": path, "name": name, "disabled": false}}

    const getNav = () => {
        const pathitems = pathname.split('/')

        let links = []

        let skipNext = false
        pathitems.forEach((pathNode, index) => {

            const getPath = (pullid = false) => {
                const pullAmount = pullid ? 1 : 0
                return `${pathitems.slice(0, index + 1 + pullAmount).join("/")}`
            }

            if (pathNode === "" || skipNext) {
                skipNext = false
                return
            }
            switch(pathNode)
            {
                case "decks":
                    links.push(createLink(getPath(true), deck))
                    skipNext = true
                    break
                default:
                    links.push(createLink(getPath(), pathNode.charAt(0).toUpperCase() + pathNode.slice(1)))
            }
        })

        links[links.length - 1] = {
            ...links[links.length - 1],
            disabled: true //disable the final link
        }

        return links
    }

    return (
        <div className="bg-light p-3 mb-2 d-flex">
            <NavLink name="Home" to="/" className="bi-house-door-fill"/> 
            {
                getNav().map(({name, path, disabled}, index) => (
                    <React.Fragment key={index}>
                        <span>{` / `}</span>
                        <NavLink name={name} to={path} disabled={disabled} />
                    </React.Fragment>
                ))}
        </div>
    )
}

export default DeckNav