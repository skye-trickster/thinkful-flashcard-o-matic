import React from "react"
import {Link, useHistory} from "react-router-dom"
import { deleteDeck } from "../../utils/api"

export function Study({to="/", className=""}) {
    return <Link to={to} className={`btn btn-primary bi-journal-bookmark-fill ${className}`}> Study</Link>
}

export function Edit({to="/", className=""}) {
    return <Link to={to} className={`btn btn-secondary bi-pencil-fill ${className}`}> Edit</Link>
}

export function DeleteDeck({id, to="/", className=""}) {
    const history = useHistory()

    async function deleteHandler() {
        if(id === undefined) return

        const abortController = new AbortController()
        try {
            if(window.confirm(`Are you sure that you want to delete this deck? ${id}`)) {
                await deleteDeck(id, abortController.signal)
                history.push(to)
            }
        } catch(error) {
            if (error.name !== "AbortError")
                throw error
        }
    }

    return <button onClick={deleteHandler} type="button" className={`btn btn-danger bi-trash-fill ${className}`} />
}