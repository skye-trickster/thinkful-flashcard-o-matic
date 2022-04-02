import React, {useState, useEffect} from "react"
import {useRouteMatch, useParams} from "react-router-dom"
import { readCard } from "../../utils/api";

function Card({deck}) {
    const [card, setCard] = useState({})
    const route = useRouteMatch();
    const {cardid} = useParams();

    useEffect(() => {
        async function loadCard()  {
            try {
                if (cardid !== undefined) {
                    const response = await readCard(cardid)
                    //console.log("response: ", response)
                    setCard(response)
                }
            } catch (functionError) {
                if (functionError.name !== "AbortError")
                    throw functionError
            }
        }
        loadCard();
    }, [cardid])

    return null
}

export default Card;