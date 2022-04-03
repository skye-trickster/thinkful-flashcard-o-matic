import React from "react"
import {Link, useLocation} from "react-router-dom"

function NavLink({name, to, className="", disabled=false}) {
    
    const colorOverride = disabled ? "disabled" : "text-primary"
    return <Link to={to} className={`p-0 mr-1 ml-1 btn ${className} ${colorOverride}`}>{name}</Link>
}

function DeckNav ({deck=""}) {
    const {pathname} = useLocation()

    const createLink = (path, name) => {return {"path": path, "name": name, "disabled": false}}

    const getNav = () => {
        const pathitems = pathname.split('/')

        let links = []

        let skipNext = false
        let modifier = ""

        const updateLastLink = (link) => links[links.length - 1] = link

        pathitems.forEach((pathNode, index) => {

            const getPath = (pullid = false) => {
                const pullAmount = pullid ? 1 : 0
                return `${pathitems.slice(0, index + 1 + pullAmount).join("/")}`
            }

            const peek = () => pathitems[index + 1]

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
                case "cards":

                    const modify = (peek() !== "new") //don't modify if next is labelled as new

                    modifier = `Card${modify ? ` ${peek()}` : ""}`
                    
                    links.push(createLink(getPath(modify), modifier))
                    skipNext = modify
                    return //returns early to avoid skip next check
                case "new":
                    if (modifier)
                        updateLastLink(createLink(getPath(false), `Add ${modifier}`))

                    break;
                case "edit":
                    if (modifier) // update the last link to say "edit if last link can be modified"
                    {
                        updateLastLink(createLink(getPath(), `Edit ${modifier}`))
                        modifier = ""
                        break;
                    }
                    //falls through to default
                default:
                    const linkUpperCase = pathNode.charAt(0).toUpperCase() + pathNode.slice(1)
                    links.push(createLink(getPath(), linkUpperCase))
            }
            if (!skipNext) modifier = ""
        })

        updateLastLink({
            ...links[links.length - 1],
            disabled: true //disable the final link
        })

        return links
    }

    return (
        <nav className="nav bg-light p-3 mb-2 d-flex">
            <NavLink name="Home" to="/" className="bi-house-door-fill"/> 
            {
                getNav().map(({name, path, disabled}, index) => (
                    <React.Fragment key={index}>
                        <span>{` / `}</span>
                        <NavLink name={name} to={path} disabled={disabled} />
                    </React.Fragment>
                ))}
        </nav>
    )
}

export default DeckNav