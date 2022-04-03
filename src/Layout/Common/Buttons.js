import React from "react"
import {Link} from "react-router-dom"

export function Study({to="/", className=""}) {
    return <Link to={to} className={`btn btn-primary bi-journal-bookmark-fill ${className}`}> Study</Link>
}

export function Edit({to="/", className=""}) {
    return <Link to={to} className={`btn btn-secondary bi-pencil-fill ${className}`}> Edit</Link>
}

export function Delete({deleteFunction, id, to="/", className=""}) {
    function deleteHandler() { deleteFunction(id, to) }
    return <button onClick={deleteHandler} type="button" className={`btn btn-danger bi-trash-fill ${className}`} />
}

export function AddCards({to="#"}) {
    return <Link to={to} className="btn btn-primary bi-plus"> Add Cards</Link>
}