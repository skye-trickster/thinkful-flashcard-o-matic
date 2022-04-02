import React from "react"
import CardList from "./CardList"
import {Study, Edit, Delete} from "../Common/Buttons"
import {Link} from "react-router-dom"

function DeckDisplay({deck, deleteFunction = () => {}})
{
    const route = `/decks/${deck.id}`
    return (
        
        <div>
            <div>
                <h3>{deck.name}</h3>
                <p>{deck.description}</p>
            </div>
            <div className="d-flex justify-content-between">
                <div className="m-0">
                    <Edit to={`${route}/edit`} className="mr-2" />
                    <Study to="/" className="mr-2" />
                    <Link to="/" className="btn btn-primary bi-plus"> Add Cards</Link>
                </div>
                <Delete deleteFunction={deleteFunction} to="/" id={deck.id}/>

            </div>

            <CardList cards={deck.cards}/>

        </div>

    );
}

export default DeckDisplay