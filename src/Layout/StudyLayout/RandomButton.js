import React from "react"

function RandomButton({shuffled, shuffleFunction, className=""}) {

    const icon = shuffled ? "bi-arrow-right" : "bi-shuffle"
    return <button onClick={shuffleFunction} className={`btn btn-primary ${icon} ${className}`}> {shuffled ? "Stop Shuffle" : "Shuffle" }</button>
}

export default RandomButton