import React from "react"
import { Route, Switch, useRouteMatch, useHistory } from "react-router-dom"
import {createDeck} from "../../utils/api"

import NotFound from "../NotFound"
import CreateDeck from "./CreateDeck"
import Deck from "./Deck"

function DecksLayout() {
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

    return (
        <>
            <Switch>
                <Route path={`${route.url}/new`}>
                    <CreateDeck createFunction={create} cancelFunction={cancel}/>
                </Route>

                <Route path={`${route.url}/:deckid`}>
                    <Deck />
                </Route>

                <Route>
                    <NotFound />
                </Route>
            </Switch>

        </>
    )
}

export default DecksLayout;