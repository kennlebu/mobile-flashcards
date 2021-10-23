import AsyncStorage from "@react-native-async-storage/async-storage";

export const DECKS_STORAGE_KEY = 'mobile-flashcards:decks'

export function getDecks () {
    AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => JSON.parse(results))
}

export function getDeck (id) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
            .then((results) => JSON.parse(results)[id])
}

export function saveDeckTitle(title) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [title]: {title},
    }))
}

export function addCardToDeck(title, card) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[title]['questions'] = card
            delete data[title]
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        })
}

export function removeEntry(title) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[title] = undefined
            delete data[title]
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        })
}