import React from "react";
import {Link} from "react-router-dom";

function DeckPreview({deck = {}, deleteFunction = (id) => {}}) {   

    function deleteHandler () { deleteFunction(deck.id) }

    return (
        <div className="card p-2 mt-2">
            <div className="d-flex justify-content-between">
                <h3 className="large">{deck.name}</h3>
                <p>{deck.cards.length} {`card${ deck.cards.length === 1 ? "" : "s"}`}</p>
            </div>

            <p>{deck.description}</p>
            <div className="d-flex justify-content-between">
                <div>
                    <Link to={`/decks/${deck.id}`} type="button" className="mr-2 btn btn-secondary bi-eye-fill"> View</Link>
                    <Link to={`/decks/${deck.id}/study`} type="button" className="btn btn-primary bi-journal-bookmark-fill"> Study</Link>
                </div>
                <button onClick={deleteHandler} type="button" className="btn btn-danger bi-trash-fill"></button>
            </div>
        </div>
    )
}

function DeckListPreview({deckList = [], deleteFunction = (id) => {}}) {

    const preview = deckList.map((deck, index) => {
        return <DeckPreview key={index} deck={deck} deleteFunction={deleteFunction} />
    });

    return (
        <div>
            {!deckList.length ? "Loading..." : preview}
        </div>
    )
}

export default DeckListPreview;
