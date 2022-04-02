import React, {useState, useEffect} from "react"
import {useParams, Switch, Route, useRouteMatch} from "react-router-dom"
import {readDeck} from "../../utils/api"

import NotFound from "../NotFound"
import DeckDisplay from "./DeckDisplay"
import DeckNav from "./DeckNav"
import DeckEdit from "./DeckEdit"
import CardLayout from "../CardLayout"

function Deck({deleteFunction, cancelFunction, deleteCardFunction=undefined}) {
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

    async function deleteCard(cardid) {
        if (!deleteCardFunction) return

        const response = await deleteCardFunction(cardid)
        if (response !== undefined)
            loadDeck()
    }

    return (
        <>
            <DeckNav id={deck.id} deck={deck.name}/>
            <Switch>
                <Route exact path={route.path}>
                    <DeckDisplay deck={deck} deleteFunction={deleteFunction} deleteCardFunction={deleteCard} />
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