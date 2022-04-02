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
        const { id } = await createDeck(deck)
        if (redirect) GoToDeck(id);
    }

    async function cancel() {
        if (window.confirm("Are you sure that you want to cancel creating this deck?"))
            Home();
    }

    async function deleteDeck(deckid, to) {
        const response = await requestDeckDelete(deckid)
        if (response !== undefined)
            history.push(to)
        return response
    }

    async function deleteCard(cardid) {
        const response = await requestCardDelete(cardid)
        return response
    }

    return (
        <>
            <Switch>
                <Route path={`${route.url}/new`}>
                    <CreateDeck createFunction={create} cancelFunction={cancel}/>
                </Route>

                <Route path={`${route.url}/:deckid`}>
                    <Deck deleteCardFunction={deleteCard} deleteFunction={deleteDeck} cancelFunction={GoToDeck}/>
                </Route>

                <Route>
                    <NotFound />
                </Route>
            </Switch>

        </>
    )
}

export default DeckLayout;