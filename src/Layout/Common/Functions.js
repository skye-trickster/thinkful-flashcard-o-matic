import { deleteDeck } from "../../utils/api"

export async function requestDeckDelete(deckid) {
    const abortController = new AbortController()
    try {
        if(window.confirm(`Are you sure that you want to delete this deck?`))
            return await deleteDeck(deckid, abortController.signal)
        return undefined
    } catch(error) {
        if (error.name !== "AbortError")
            throw error
    }
}