import React, {useEffect, useState} from "react";
import {listDecks, deleteDeck} from "../utils/api/index"
import DeckListPreview from "./DeckListPreview"
import {Link, useHistory} from "react-router-dom"

function Home() {
    const history = useHistory()
    const [deckList, setDecks] = useState([])

    useEffect(() => {
        const abortC = new AbortController()

        async function loadDecks() {
            try {
                const decks = await listDecks(abortC.signal);
                setDecks(decks)
                console.log("decks set")
            }
            catch (error) {
                if (error.name !== "AbortError")
                    throw error
                console.log("Aborting DeckList")
            }
        }
        loadDecks()
        return () => abortC.abort()
    }, [])

    async function requestDeckDelete(deckId) {
        const abortController = new AbortController()
        if(window.confirm("Are you sure that you want to delete this deck?")) {
            await deleteDeck(deckId, abortController.signal)
            history.go(0)
        }
    }

    return (
        <>
            <Link to="/decks/new" className="btn btn-secondary bi-plus-lg"> Create Deck</Link>
            <DeckListPreview deckList={deckList} deleteFunction={requestDeckDelete}/>
        </>
    )
}

export default Home;