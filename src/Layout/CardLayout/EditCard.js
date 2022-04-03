import React from "react";
import ContentLayer from "../Common/Content";
import Heading from "../Common/Heading";
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
            <Heading title={`Edit Card ${card.id}`} />
            <CardForm data={card} submitFunction={submitHandler} cancelFunction={cancelFunction}/>            
        </ContentLayer>
    );
}

export default EditCard;