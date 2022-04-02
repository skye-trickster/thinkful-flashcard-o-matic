import React from "react"
import CardList from "./CardList"
import {Study, Edit, Delete} from "../Common/Buttons"
import {Link, useRouteMatch} from "react-router-dom"

function DeckDisplay({deck, deleteFunction = () => {}})
{
    const {url} = useRouteMatch()
    return (
        
        <div>
            <div>
                <h3>{deck.name}</h3>
                <p>{deck.description}</p>
            </div>
            <div className="d-flex justify-content-between">
                <div className="m-0">
                    <Edit to={`${url}/edit`} className="mr-2" />
                    <Study to={`${url}/study`} className="mr-2" />
                    <Link to={`${url}/cards/new`} className="btn btn-primary bi-plus"> Add Cards</Link>
                </div>
                <Delete deleteFunction={deleteFunction} to="/" id={deck.id}/>

            </div>

            <CardList cards={deck.cards}/>

        </div>

    );
}

export default DeckDisplay