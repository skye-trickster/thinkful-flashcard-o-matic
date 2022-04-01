import React from "react"
import { Edit } from "../Common/Buttons"

function Card({card = {}}) {
    return (
        <div className="p-2 border">
            <div className="d-flex justify-content-between">
                <p className="text-secondary col-6">{card.front}</p>
                <p className="text-secondary col-6">{card.back}</p>
            </div>
            <div className="d-flex justify-content-end">
                <Edit className="m-2"/>
                <button className="m-2 btn btn-danger bi-trash-fill" />
            </div>
        </div>
    )
}

export default Card;