import React from "react"
import Card from "./CardDisplay"

function CardList({cards = [], editRoute="", deleteFunction=undefined})
{
    return (
        <div className="mt-3">
            <h2>Cards</h2>
            <div className="mt-2 border rounded">
                {cards.map((card, index) => <Card deleteFunction={deleteFunction} key={index} card={card} routeBase={editRoute}/>)}
            </div>

        </div>

    )
}

export default CardList;