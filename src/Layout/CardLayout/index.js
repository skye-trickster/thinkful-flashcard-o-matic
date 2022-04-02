import React from "react"
import {Switch, Route, useRouteMatch} from "react-router-dom"
import NotFound from "../NotFound"
import Card from "./Card"

import CreateCard from "./CreateCard"

function CardLayout({deck}) {

    const {url} = useRouteMatch()
    

    return (
        <Switch>
            <Route path={`${url}/new`}>
                <CreateCard deckName={deck.name} createFunction={() => {}} cancelFunction={() => {}}/>
            </Route>

            <Route path={`${url}/:cardid`}>
                <Card deck={deck} />
            </Route>

            <Route>
                <NotFound />
            </Route>
        </Switch>
    )
}

export default CardLayout