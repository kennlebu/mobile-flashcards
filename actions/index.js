export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_TITLE = 'ADD_TITLE';
export const ADD_CARD = 'ADD_CARD';

export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks,
    }
}

export function addDeckTitle(title) {
    return {
        type: ADD_TITLE,
        title,
    }
}

export function addCardToDeck(title, card) {
    return {
        type: ADD_CARD,
        title,
        card
    }
}