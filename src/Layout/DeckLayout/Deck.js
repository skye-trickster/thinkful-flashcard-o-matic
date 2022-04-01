import React, {useState, useEffect} from "react"
import {useParams, Link, Switch, Route} from "react-router-dom"
import {readDeck} from "../../utils/api"

import NotFound from "../NotFound"
import CardList from "./CardList"
import {Study, Edit, Delete} from "../Common/Buttons"
import DeckNav from "./DeckNav"
import { useRouteMatch } from "react-router-dom"

function DeckDisplay({deck, deleteFunction = () => {}})
{
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
                    <Delete deleteFunction={deleteFunction} to="/" id={deck.id}/>

                </div>

                <CardList cards={deck.cards}/>

            </div>
            ) : <NotFound />
            }


        </>

    );
}

function Deck({deleteFunction = () => {}}) {
    const [deck, setDeck] = useState({})
    const [error, setError] = useState(null)
    const params = useParams();
    const route = useRouteMatch()

    console.log(params, route)
    useEffect(() => {
        async function _loadDeck() {
            try {
                if (params.deckid !== null) {
                    const _deck = await readDeck(params.deckid)
                    setDeck(_deck)
                }
            } catch (_error) {
                if (_error.name !== "AbortError")
                    setError(_error)
            }
        }
        _loadDeck();
    }, [params.deckid])

    if (error || ! deck) { return <NotFound /> }

    return (
        <>
            <DeckNav id={deck.id} deck={deck.name}/>
            <Switch>
                <Route exact path={route.path}>
                    <DeckDisplay deck={deck} deleteFunction={deleteFunction} />
                </Route>
            </Switch>
        </>

    );
}


export default Deck;