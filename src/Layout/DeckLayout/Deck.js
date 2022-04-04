import React, { useState, useEffect } from "react"
import { useParams, Switch, Route, useRouteMatch } from "react-router-dom"
import { readDeck, updateDeck } from "../../utils/api"

import NotFound from "../NotFound"
import DeckDisplay from "./DeckDisplay"
import DeckNav from "./DeckNav"
import DeckEdit from "./DeckEdit"
import CardLayout from "../CardLayout"
import StudyLayout from "../StudyLayout"
import ContentLayer from "../Common/Content"

function Deck({ deleteFunction, cancelFunction, homeFunction, deleteCardFunction = undefined }) {
    const [deck, setDeck] = useState({})

    const [error, setError] = useState(null)

    const { deckid } = useParams();

    const route = useRouteMatch()

    async function loadDeck(signal) {
        try {
            if (deckid !== null) {
                const _deck = await readDeck(deckid, signal)
                setDeck(_deck)
            }
        } catch (_error) {
            if (_error.name !== "AbortError")
                setError(_error)
        }
    }

    useEffect(() => {

        setDeck({})

        const abortController = new AbortController()
        loadDeck(abortController.signal)

        return () => { abortController.abort() }
    }, [deckid])

    if (error || !deck) { return <NotFound /> }

    const returnToView = () => cancelFunction(deckid)

    async function deleteCard(cardid) {
        if (!deleteCardFunction) return

        const response = await deleteCardFunction(cardid)
        if (response !== undefined)
            loadDeck()
    }

    async function update(deck) {
        await updateDeck(deck)
        setDeck(deck)
    }

    const nav = <DeckNav deck={deck.name} />

    return (
        <ContentLayer nav={nav}>
            <Switch>
                <Route exact path={route.path}>
                    <DeckDisplay deck={deck} deleteFunction={deleteFunction} deleteCardFunction={deleteCard} />
                </Route>

                <Route path={`${route.path}/study`}>
                    <StudyLayout deck={deck} addCardLink={`${route.url}/cards/new`} endStudyFunction={homeFunction} />
                </Route>

                <Route path={`${route.path}/edit`}>
                    <DeckEdit updateFunction={update} returnToViewFunction={returnToView} deck={deck} />
                </Route>

                <Route path={`${route.path}/cards`}>
                    <CardLayout deck={deck} deckRefreshMethod={loadDeck} returnToDeck={returnToView} />
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </ContentLayer>

    );
}


export default Deck;