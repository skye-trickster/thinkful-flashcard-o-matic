import React from "react"
import ContentLayer, { Heading } from "../Common/Content"
import DeckForm from "./DeckForm"

function DeckEdit({updateDeck, returnToViewFunction, deck}) {

    function submitHandler(result) {
        updateDeck(result)
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