import React, {useState, useEffect} from "react"
import {useParams, Link} from "react-router-dom"
import {readDeck} from "../../utils/api"

import NotFound from "../NotFound"
import CardList from "./CardList"
import {Study, Edit, Delete} from "../Common/Buttons"

function Deck({deleteFunction = () => {}}) {
    const [deck, setDeck] = useState({})
    const [error, setError] = useState(null)
    const {deckid} = useParams();

    useEffect(() => {
        async function _loadDeck() {
            try {
                if (deckid !== null) {
                    const _deck = await readDeck(deckid)
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
                        <Edit to="/" className="mr-2" />
                        <Study to="/" className="mr-2" />
                        <Link to="/" className="btn btn-primary bi-plus"> Add Cards</Link>
                    </div>
                    <Delete deleteFunction={deleteFunction} to="/" id={deckid}/>

                </div>

                <CardList cards={deck.cards}/>

            </div>
            ) : <NotFound />
            }


        </>

    );
}

export default Deck;