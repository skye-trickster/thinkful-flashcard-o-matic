import React, { useEffect, useState } from "react"
import ContentLayer from "../Common/Content"
import Heading from "../Common/Heading"
import NotEnoughCards from "./NotEnoughCards"
import StudyCard from "./StudyCard"

function StudyLayout({deck, addCardLink="/", endStudyFunction}) {
    const {cards} = deck
    const [index, setIndex] = useState(0)
    const [shuffle, setShuffle] = useState(false)
    const [reference, setReference] = useState([])

    const getCard = () => cards[reference[index]]
    const validCardLength = () => cards && cards.length > 2
    const restart = () => {
        shuffleCards()
        setIndex(0)
    }
    const nextCard = () => {
        if (index >= cards.length - 1) return false

        setIndex(index + 1)
        return true        
    }

    const orderedIndex = () => cards.map((ignored, index) => index)

    const shuffleIndex = () => {
        const numbers = cards.map((ignored, index) => index)
        
        const randomize = () => Math.floor(Math.random() * numbers.length)

        for (let i = numbers.length - 1, j = randomize(); i > j; --i, j = randomize()) {
            let temp = numbers[i]
            numbers[i] = numbers[j]
            numbers[j] = temp
        }

        return numbers
    }

    const shuffleCards = () => {
        if (! (cards && Object.keys(cards).length)) return
        setReference( shuffle ? shuffleIndex : orderedIndex() )
    }

    const startShuffle = () => {
        if (!window.confirm("Are you sure you want to shuffle the deck?\n\nThis will restart the study session.")) return 

        shuffleCards()
        restart()
    }

    useEffect(shuffleCards, [shuffle, cards]) 

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