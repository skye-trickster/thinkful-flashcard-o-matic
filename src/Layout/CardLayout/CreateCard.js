import React from "react";
import ContentLayer, { Heading } from "../Common/Content";

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
        <ContentLayer>
            <Heading title={`${deck.name}: Add Card`} />
            <CardForm submitFunction={submitHandler} cancelFunction={cancelFunction}/>
        </ContentLayer>
    );
}

export default CreateCard;