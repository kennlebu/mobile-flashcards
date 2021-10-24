import { addCardToDeck, answerQuestion, getDeck, getDecks, removeEntry } from "../utils/helpers";

export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const ADD_TITLE = "ADD_TITLE";
export const ADD_CARD = "ADD_CARD";
export const DELETE_DECK = "DELETE_DECK";
export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const RESTART_QUIZ = "RESTART_QUIZ";
export const SELECT_DECK = "SELECT_DECK";

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

export function handleReceiveDecks() {
  return (dispatch) => {
    getDecks().then((decks) => {
      console.log("API: ", decks);
      dispatch(receiveDecks(decks));
    });
  };
}

export function addDeckTitle(title) {
  return {
    type: ADD_TITLE,
    title,
  };
}

export function addCard(title, card) {
  return {
    type: ADD_CARD,
    title,
    card,
  };
}

export function handleAddCardToDeck(title, card) {
  return (dispatch) => {
    addCardToDeck(title, card).then(() => {
      dispatch(addCard(title, card));
    });
  };
}

export function deleteDeck(title) {
  return {
    type: DELETE_DECK,
    title,
  };
}

export function handleDeleteDeck(title) {
  return (dispatch) => {
    removeEntry(title).then(() => {
      dispatch(deleteDeck(title));
    });
  };
}

export function answerQuestionAction(title, answer) {
  return {
    type: ANSWER_QUESTION,
    title,
    answer,
  };
}

export function handleAnswerQuestion(title, answer) {
    return (dispatch) => {
        answerQuestion(title, answer).then(() => {
            dispatch(answerQuestionAction(title, answer))
        })
    }
}

export function restartQuizAction(title) {
  return {
    type: RESTART_QUIZ,
    title,
  };
}
