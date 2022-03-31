import React, {useEffect, useState} from "react";
import {listDecks} from "../utils/api/index"
import DeckListPreview from "./DeckListPreview"

function Home() {
    const [deckList, setDecks] = useState([])

    useEffect(() => {
        async function loadDecks()
        {
            const abortC = new AbortController()
            try {
                const _decks = await listDecks(abortC.signal);
                console.log("deck list 2: ", _decks)
                setDecks(_decks)
            }
            catch (error) {
                console.log("Error! ", error.name)
            }

        }
        loadDecks()
    }, [])

    //const deckList = listDecks()
    console.log("deck list: ", deckList)


    return (
        <>
            <button className="btn btn-secondary bi-plus-lg"> Create Deck</button>
            <DeckListPreview deckList={deckList}/>
        </>
    )
}

export default Home;