import React from "react"
import {Switch, Route, useRouteMatch} from "react-router-dom"
import { createCard, updateCard } from "../../utils/api"
import NotFound from "../NotFound"
import Card from "./Card"

import CreateCard from "./CreateCard"

function CardLayout({deck, returnToDeck, deckRefreshMethod}) {

    const {url} = useRouteMatch()

    
    async function create(card, redirect=true)
    {
        console.log(card)
        await createCard(deck.id, card)
        deckRefreshMethod()
        if (redirect) returnToDeck()
    }

    async function update(card) {
        await updateCard(card)
        deckRefreshMethod()
        returnToDeck()
    }

    return (
        <Switch>
            <Route path={`${url}/new`}>
                <CreateCard deck={deck} createFunction={create} cancelFunction={returnToDeck}/>
            </Route>

            <Route path={`${url}/:cardid`}>
                <Card updateCardMethod={update} returnToDeckFunction={returnToDeck} deck={deck} />
            </Route>

            <Route>
                <NotFound />
            </Route>
        </Switch>
    )
}

export default CardLayout