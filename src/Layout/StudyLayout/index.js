import React, { useState } from "react"
import ContentLayer from "../Common/Content"
import Heading from "../Common/Heading"
import NotEnoughCards from "./NotEnoughCards"
import StudyCard from "./StudyCard"

function StudyLayout({deck, addCardLink="/", endStudyFunction}) {
    const {cards} = deck
    const [index, setIndex] = useState(0)

    const getCard = () => cards[index]
    const validCardLength = () => cards && cards.length > 2
    const restart = () => setIndex(0)

    const nextCard = () => {
        if (index >= cards.length - 1) return false

        setIndex(index + 1)
        return true        
    }

    if (Object.keys(deck).length === 0) return "Loading Deck..."

    return (
        <ContentLayer>
            <Heading title={`Study: ${deck.name}`} />
            { 
                validCardLength() ? 
                    <StudyCard card={getCard()} nextFunction={nextCard} cardIndex={index + 1} cardTotal={cards.length} endSessionFunction={endStudyFunction} restartFunction={restart}/> : 
                    <NotEnoughCards cards={cards} addCardLink={addCardLink}/> 
            }
        </ContentLayer>
    )
}



export default StudyLayout