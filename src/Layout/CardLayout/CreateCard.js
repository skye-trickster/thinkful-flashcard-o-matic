import React from "react";

import CardForm from "./CardForm"

function CreateDeck({createFunction, cancelFunction, deckName}) {

    return (
        <div>
            <h1>{deckName}: Add Card</h1>
            <CardForm submitFunction={createFunction} cancelFunction={cancelFunction}/>
        </div>
    );
}

export default CreateDeck;