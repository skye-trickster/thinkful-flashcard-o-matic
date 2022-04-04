import React from "react"
import { Route, Switch, useRouteMatch, useHistory } from "react-router-dom"
import { createDeck } from "../../utils/api"

import { requestCardDelete, requestDeckDelete } from "../Common/Functions"

import NotFound from "../NotFound"
import CreateDeck from "./CreateDeck"
import Deck from "./Deck"

/** Wrapper component for deck layout */
function DeckLayout() {
    const history = useHistory()
    const route = useRouteMatch()

    const GoToDeck = (id) => history.push(`${route.url}/${id}`)
    const Home = () => history.push(`/`)

    /**
     * Creates a deck and redirects to that DeckDisplay component
     */
    async function create(deck) {

        const abortController = new AbortController()

        try {
            const { id } = await createDeck(deck, abortController.signal)
            GoToDeck(id)
        } catch (error) {
            if (error.name !== "AbortError") throw error
        }

        return () => { abortController.abort() }

    }

    /** Deletes Deck and redirects to a given page */
    async function deleteDeck(deckid, to) {
        const response = await requestDeckDelete(deckid)

        if (response !== undefined) history.push(to)

        return response
    }

    /** Deletes a card given the card ID */
    async function deleteCard(cardId) {
        const response = await requestCardDelete(cardId)

        return response
    }

    return (
        <Switch>

            <Route path={`${route.url}/new`}>
                <CreateDeck createFunction={create} cancelFunction={Home} />
            </Route>

            <Route path={`${route.url}/:deckid`}>
                <Deck deleteCardFunction={deleteCard} deleteFunction={deleteDeck} cancelFunction={GoToDeck} homeFunction={Home} />
            </Route>

            <Route>
                <NotFound />
            </Route>

        </Switch>
    )
}

export default DeckLayout