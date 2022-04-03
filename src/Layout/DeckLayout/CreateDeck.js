import React from "react";

import DeckNav from "./DeckNav"
import DeckForm from "./DeckForm"
import ContentLayer, { Heading } from "../Common/Content";

function CreateDeck({createFunction, cancelFunction}) {

    return (
        <ContentLayer nav={(<DeckNav deck="Create New" />)}>
            <Heading title="Create Deck" />
            <DeckForm submitFunction={createFunction} cancelFunction={cancelFunction}/>
        </ContentLayer>
    );
}

export default CreateDeck;