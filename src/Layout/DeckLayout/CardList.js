import React from "react"
import Card from "./Card"

function CardList({cards = []})
{
    return (
        <div className="mt-3">
            <h2>Cards</h2>
            <div className="mt-2 border rounded">
                {cards.map((card, index) => <Card key={index} card={card}/>)}
            </div>

        </div>

    )
}

export default CardList;