import React from "react"
import {Switch, Route} from "react-router-dom"

import CreateCard from "./CreateCard"

function CardLayout({deck}) {



    return (
        <Switch>
            <Route>
                <CreateCard deckName={deck.name} createFunction={() => {}} cancelFunction={() => {}}/>
            </Route>
        </Switch>
    )
}

export default CardLayout