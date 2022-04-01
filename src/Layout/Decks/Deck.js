import React, {useState, useEffect} from "react"
import {useParams, Link} from "react-router-dom"
import {readDeck} from "../../utils/api"

import NotFound from "../NotFound"
import CardList from "./CardList"

function Deck() {
    const [deck, setDeck] = useState({})
    const [error, setError] = useState(null)
    const {deckid} = useParams();

    useEffect(() => {
        async function _loadDeck() {
            try {
                if (deckid !== null) {
                    const _deck = await readDeck(deckid)
                    console.log("deck: ", _deck)
                    setDeck(_deck)
                }
            } catch (_error) {
                if (_error.name !== "AbortError")
                    setError(_error)
            }
        }
        _loadDeck();
    }, [deckid])

    if (error) { return <NotFound /> }

    return (
        <>
            { deck ? (
            <div>
                <div>
                    <h3>{deck.name}</h3>
                    <p>{deck.description}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <div className="m-0">
                        <Link to="/" className="mr-2 btn btn-secondary bi-pencil-fill">Edit</Link>
                        <Link to="/" className="mr-2 btn btn-primary bi-journal-bookmark-fill">Study</Link>
                        <Link to="/" className="btn btn-primary bi-plus"> Add Cards</Link>
                    </div>
                    <button onClick={() => console.log("deleting")} type="button" className="btn btn-danger bi-trash-fill" />

                </div>


                <CardList cards={deck.cards}/>

            </div>
            ) : <NotFound />
            }


        </>

    );
}

export default Deck;