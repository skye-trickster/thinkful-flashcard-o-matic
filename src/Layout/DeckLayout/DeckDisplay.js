import React from "react"
import CardList from "./CardListDisplay"
import { Study, Edit, Delete } from "../Common/Buttons"
import { Link, useRouteMatch } from "react-router-dom"

/**
 * Component used for dispalying a deck
 * @param {object} paramList
 * 
 * @param {object} paramList.deck
 * The current deck to display
 * 
 * @param {function} paramList.deleteFunction
 * The function used to delete the deck
 * 
 * @param {function} paramList.deleteCardFunction
 * The function used to delete a card
 * 
 * @returns A component used to display a deck
 */
function DeckDisplay({ deck, deleteFunction, deleteCardFunction }) {
    const { url } = useRouteMatch()
    return (
        <div className="deck-display">
            <div>
                <h2>{deck.name}</h2>
                <p>{deck.description}</p>
            </div>
            <div className="d-flex justify-content-between">
                <div className="m-0">
                    <Edit to={`${url}/edit`} className="mr-2" />
                    <Study to={`${url}/study`} className="mr-2" />
                    <Link to={`${url}/cards/new`} className="btn btn-primary bi-plus"> Add Cards</Link>
                </div>
                <Delete deleteFunction={deleteFunction} to="/" id={deck.id} />

            </div>

            <CardList editRoute={url} cards={deck.cards} deleteFunction={deleteCardFunction} />

        </div>

    );
}

export default DeckDisplay