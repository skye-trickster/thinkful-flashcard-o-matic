import React, {useState, useEffect} from "react"

function StudyCard({card = {}, nextFunction, cardIndex, cardTotal, restartFunction, endSessionFunction}) {
    const {front, back} = card;
    const [checkBack, setBackView] = useState(false) 

    const flip = () => setBackView(!checkBack)

    useEffect(() => { setBackView(false) }, [card])

    function nextCardHandler()
    {
        if (cardIndex < cardTotal) return nextFunction()

        if (window.confirm("Restart cards?\n\nClick 'cancel' to return to the home page.")) restartFunction()
        else endSessionFunction()
    }

    return (
        <div className="card p-3">
            <h4>Card {cardIndex} of {cardTotal}</h4>
            <p>{checkBack ? back : front}</p>
            <div>
                <button onClick={flip} className="btn btn-secondary mr-2">Flip</button>
                { checkBack ?
                    <button onClick={nextCardHandler} className="btn btn-primary">Next</button> :
                    null
                }
            </div>
        </div>
    )
}

export default StudyCard