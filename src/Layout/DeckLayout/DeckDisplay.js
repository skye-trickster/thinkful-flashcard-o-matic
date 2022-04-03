import React from "react"
import CardList from "./CardListDisplay"
import {Study, Edit, Delete} from "../Common/Buttons"
import {Link, useRouteMatch} from "react-router-dom"
//import ContentLayer from "../Common/Content"

function DeckDisplay({deck, deleteFunction=undefined, deleteCardFunction=undefined})
{
    const {url} = useRouteMatch()
    return (
        
        <>
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
                <Delete deleteFunction={deleteFunction} to="/" id={deck.id}/>

            </div>

            <CardList editRoute={url} cards={deck.cards} deleteFunction={deleteCardFunction}/>

        </>

    );
}

export default DeckDisplay