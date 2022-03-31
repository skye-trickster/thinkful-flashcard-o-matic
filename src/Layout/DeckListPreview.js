import React from "react";


function DeckPreview({deck = {}})
{   
    return (
        <div className="card p-2 mt-2">
            <div className="d-flex justify-content-between">
                <h3 className="large">{deck.name}</h3>
                <p>3 cards</p>
            </div>

            <p>{deck.description}</p>
            <div className="d-flex justify-content-between">
                <div>
                    <button type="button" className="mr-2 btn btn-secondary bi-eye-fill"> View</button>
                    <button type="button" className="btn btn-primary bi-journal-bookmark-fill"> Study</button>
                </div>
                <button type="button" className="btn btn-danger bi-trash-fill"></button>
            </div>
        </div>
    )
}

function DeckListPreview({deckList = []})
{
    console.log(deckList)

    const preview = deckList.map((deck, index) => {
        console.log(deck)
        return <DeckPreview key={index} deck={deck} />
    });
    return (
        <div>
            {preview}
        </div>
    )
}

export default DeckListPreview;