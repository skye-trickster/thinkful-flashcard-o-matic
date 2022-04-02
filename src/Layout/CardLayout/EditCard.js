import React from "react";

import CardForm from "./CardForm"

function EditCard({updateFunction, cancelFunction, card}) {

    async function submitHandler(card)
    {
        await updateFunction(card)
        cancelFunction()
    }
    if (!Object.keys(card).length) return "Loading..." //don't load the form until the deck is loaded
    return (
        <div>
            <h1>Edit Card {card.id}</h1>
            <CardForm data={card} submitFunction={submitHandler} cancelFunction={cancelFunction}/>
        </div>
    );
}

export default EditCard;