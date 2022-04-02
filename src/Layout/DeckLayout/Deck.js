import React, {useState, useEffect} from "react"
import {useParams, Switch, Route, useRouteMatch} from "react-router-dom"
import {readDeck} from "../../utils/api"

import NotFound from "../NotFound"
import DeckDisplay from "./DeckDisplay"
import DeckNav from "./DeckNav"
import DeckEdit from "./DeckEdit"
import CardLayout from "../CardLayout"

function Deck({deleteFunction = () => {}, cancelFunction}) {
    const [deck, setDeck] = useState({})

    const [error, setError] = useState(null)

    const {deckid} = useParams();

    const route = useRouteMatch()

    async function loadDeck() {
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

    useEffect(() => {loadDeck()}, [deckid])

    if (error || ! deck) { return <NotFound /> }
    
    const returnToView = () => cancelFunction(deckid)

    return (
        <>
            <DeckNav id={deck.id} deck={deck.name}/>
            <Switch>
                <Route exact path={route.path}>
                    <DeckDisplay deck={deck} deleteFunction={deleteFunction} />
                </Route>
                <Route path={`${route.path}/edit`}>
                    <DeckEdit updateDeck={setDeck} returnToViewFunction={returnToView} deck={deck}/>
                </Route>

                <Route path={`${route.path}/cards`}>
                    <CardLayout deck={deck} deckRefreshMethod={loadDeck} returnToDeck={returnToView} />
                </Route>
            </Switch>
        </>

    );
}


export default Deck;