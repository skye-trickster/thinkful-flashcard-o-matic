import React from "react";

import DeckNav from "./DeckNav"
import DeckForm from "./DeckForm"

function CreateDeck({createFunction, cancelFunction}) {

    return (
        <div>
            <DeckNav deck="Create New"/>
            <DeckForm submitFunction={createFunction} cancelFunction={cancelFunction}/>
        </div>
    );
}

export default CreateDeck;