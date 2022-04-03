import React from "react"
import ContentLayer from "../Common/Content"
import Heading from "../Common/Heading"
import DeckForm from "./DeckForm"

function DeckEdit({ updateFunction, returnToViewFunction, deck }) {

    function submitHandler(result) {
        updateFunction(result)
        returnToViewFunction()
    }

    if (!Object.keys(deck).length) return "Loading..." //don't load the form until the deck is loaded
    
    return (
        <ContentLayer>
            <Heading title={"Edit Deck"} />
            <DeckForm data={deck} submitFunction={submitHandler} cancelFunction={returnToViewFunction}/>
        </ContentLayer>

    )
}

export default DeckEdit