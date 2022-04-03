import React from "react"
import { Route, Switch, useRouteMatch, useHistory } from "react-router-dom"
import {createDeck} from "../../utils/api"

import NotFound from "../NotFound"
import CreateDeck from "./CreateDeck"
import Deck from "./Deck"
import {requestCardDelete, requestDeckDelete} from "../Common/Functions"

function DeckLayout() {
    const history = useHistory();
    const route = useRouteMatch();

    const GoToDeck = (id) => history.push(`${route.url}/${id}`)
    const Home = () => history.push(`/`)

    async function create(deck, redirect=true) {
        
        const abortController = new AbortController()

        try {
            const { id } = await createDeck(deck, abortController.signal)
            if (redirect) GoToDeck(id);
        } catch (error) {
            if (error.name !== "AbortError") throw error
        }

        return () => { abortController.abort() }

    }

    async function deleteDeck(deckid, to) {
        const response = await requestDeckDelete(deckid)

        if (response !== undefined) history.push(to)
        
        return response
    }

    async function deleteCard(cardid) {
        const response = await requestCardDelete(cardid)
        
        return response
    }

    return (
        <Switch>
            <Route path={`${route.url}/new`}>
                <CreateDeck createFunction={create} cancelFunction={Home}/>
            </Route>

            <Route path={`${route.url}/:deckid`}>
                <Deck deleteCardFunction={deleteCard} deleteFunction={deleteDeck} cancelFunction={GoToDeck} homeFunction={Home}/>
            </Route>

            <Route>
                <NotFound />
            </Route>
        </Switch>
    )
}

export default DeckLayout;