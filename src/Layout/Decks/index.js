import React, {useEffect, useState} from "react"
import NotFound from "../NotFound"
import CreateDeck from "./CreateDeck"
import { Route, Switch, useRouteMatch, useHistory } from "react-router-dom"
import {createDeck, readDeck} from "../../utils/api"

function DecksLayout() {
    const history = useHistory();
    const route = useRouteMatch();
    const [deckId, setDeckId] = useState(null)
    const [deck, setDeck] = useState({})

    useEffect(() => {

        async function loadDeck() {
            try {
                if (deckId !== null) {
                    console.log("deck ID: ", deckId)
                    const _deck = await readDeck(deckId)
                    setDeck(_deck)
                }
            } catch (error) {
                console.log(error.name)
                throw error
            }
        }
        loadDeck();
    }, [deckId])

    const Home = () => history.push("/")

    async function create(deck, redirect=true) {
        const { id } = await createDeck(deck)
        setDeckId(id)
        if (redirect) Home();
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

                <Route>
                    <NotFound />
                </Route>
            </Switch>

        </>
    )
}

export default DecksLayout;