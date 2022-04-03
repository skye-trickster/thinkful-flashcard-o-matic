import React from "react";
import ContentLayer from "../Common/Content";

import CardForm from "./CardForm"

function EditCard({updateFunction, cancelFunction, card}) {

    async function submitHandler(card)
    {
        await updateFunction(card)
        cancelFunction()
    }
    if (!Object.keys(card).length) return "Loading..." //don't load the form until the deck is loaded
    return (
        <ContentLayer>
            <h1>Edit Card {card.id}</h1>
            <CardForm data={card} submitFunction={submitHandler} cancelFunction={cancelFunction}/>            
        </ContentLayer>
    );
}

export default EditCard;