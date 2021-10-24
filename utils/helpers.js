import AsyncStorage from "@react-native-async-storage/async-storage"

export const DECKS_STORAGE_KEY = 'mobile-flashcards:decks'

export function getDecks () {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => JSON.parse(results))
}

export function getDeck (id) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
            .then((results) => JSON.parse(results)[id])
}

export function saveDeckTitle(title) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [title]: {title, questions: [], answers: []},
    }))
}

export function addCardToDeck(title, card) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[title].questions.push(card)
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        })
}

export function removeEntry(title) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const data = Object.assign({}, JSON.parse(results))
            data[title] = undefined
            delete data[title]
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        })
}

export function answerQuestion(title, answer) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[title].answers.push(answer)
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        })
}

export function restartQuiz(title) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[title].answers = []
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        })
}