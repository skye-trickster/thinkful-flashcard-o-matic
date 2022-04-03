import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom"

import {listDecks} from "../../utils/api"

import DeckListPreview from "./DeckListPreview"
import {requestDeckDelete} from "../Common/Functions"
import ContentLayer from "../Common/Content";


function Home() {
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

    async function deleteDeck(deckId) {
        const response = await requestDeckDelete(deckId)

        if (response === undefined) return 

        const deckListTemp = deckList.filter((deckItem) => deckItem.id !== deckId)
        setDecks(deckListTemp)

        return response;
    }

    return (
        <ContentLayer>
            <Link to="/decks/new" className="btn btn-secondary bi-plus-lg"> Create Deck</Link>
            <DeckListPreview deckList={deckList} deleteFunction={deleteDeck}/>
        </ContentLayer>
    )}

export default Home;