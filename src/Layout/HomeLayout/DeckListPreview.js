import React from "react";

import DeckPreview from "./DeckPreview"

function DeckListPreview({deckList = [], deleteFunction = (id) => {}}) {

    if (!deckList.length) return "Loading.."

    const preview = deckList.map((deck, index) => {
        return <DeckPreview key={index} deck={deck} deleteFunction={deleteFunction} />
    });

    return (
        <div className="deck-list">
            { preview }
        </div>
    )
}

export default DeckListPreview;
