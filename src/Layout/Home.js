import React, {useEffect, useState} from "react";
import {listDecks} from "../utils/api/index"
import DeckListPreview from "./DeckListPreview"

function Home() {
    const [deckList, setDecks] = useState([])

    useEffect(() => {
        const abortC = new AbortController()

        async function loadDecks()
        {
            try {
                const decks = await listDecks(abortC.signal);
                setDecks(decks)
            }
            catch (error) {
                if (error.name !== "AbortError")
                    throw error
                console.log("Error! ", error.name)
            }
        }
        loadDecks()
        return () => abortC.abort()
    }, [])


    return (
        <>
            <button className="btn btn-secondary bi-plus-lg"> Create Deck</button>
            <DeckListPreview deckList={deckList}/>
        </>
    )
}

export default Home;