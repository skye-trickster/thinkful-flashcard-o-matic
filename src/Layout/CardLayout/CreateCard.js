import React from "react";

import CardForm from "./CardForm"

function CreateCard({createFunction, cancelFunction, deck}) {

    function submitHandler(card)
    {
        console.log(deck.id)
        createFunction({
            ...card,
            "deckId" : deck.id
        })
    }
    return (
        <div>
            <h1>{deck.name}: Add Card</h1>
            <CardForm submitFunction={submitHandler} cancelFunction={cancelFunction}/>
        </div>
    );
}

export default CreateCard;