import React from "react"
import DeckForm from "./DeckForm"

function DeckEdit({updateDeck, returnToViewFunction, deck}) {

    function submitHandler(result) {
        updateDeck(result)
        returnToViewFunction()
    }

    if (!Object.keys(deck).length) return "Loading..." //don't load the form until the deck is loaded
    return <DeckForm data={deck} edit submitFunction={submitHandler} cancelFunction={returnToViewFunction}/>
}

export default DeckEdit