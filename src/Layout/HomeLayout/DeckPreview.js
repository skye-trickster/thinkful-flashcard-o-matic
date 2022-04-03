import React from "react"
import {Link} from "react-router-dom";

import {Study, Delete} from "../Common/Buttons"

function DeckPreview({deck = {}, deleteFunction = (id) => {}}) {   

    return (
        <div className="deck-preview card p-2 mt-2">
            <div className="d-flex justify-content-between">
                <h3 className="large">{deck.name}</h3>
                <p>{deck.cards.length} {`card${ deck.cards.length === 1 ? "" : "s"}`}</p>
            </div>

            <p>{deck.description}</p>
            <div className="d-flex justify-content-between">
                <div>

                    <Link to={`/decks/${deck.id}`} type="button" className="mr-2 btn btn-secondary bi-eye-fill"> View</Link>
                    <Study to={`/decks/${deck.id}/study`} type="button" className="mr-2" />
                </div>
                <Delete deleteFunction={deleteFunction} to="/index.html" id={deck.id}/>
            </div>
        </div>
    )
}

export default DeckPreview