import React from "react"
import DeckForm from "./DeckForm"

function DeckEdit({updateDeck, returnToViewFunction, deck}) {

    function submitHandler(result) {
        updateDeck(result)
        returnToViewFunction()
    }
    return <DeckForm data={deck} edit submitFunction={submitHandler} cancelFunction={returnToViewFunction}/>
}

export default DeckEdit