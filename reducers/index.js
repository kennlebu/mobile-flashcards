import { ADD_CARD, ADD_TITLE, ANSWER_QUESTION, DELETE_DECK, RECEIVE_DECKS, RESTART_QUIZ, SELECT_DECK } from "../actions";


function decks(state = {}, action) {
    switch(action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_TITLE:
            return {
                ...state,
                [action.title]: {
                    title: action.title,
                    questions: [],
                    answers: []
                }
            }
        case ADD_CARD:
            return {
                ...state,
                [action.title]: {
                    ...state[action.title],
                    questions: state[action.title].questions.concat([action.card])

                }
            }
        case DELETE_DECK:
            return Object.keys(state)
                .filter(key => key !== action.title)
                .reduce((result, current) => {
                    result[current] = state[current];
                    return result;
                }, {});
        case ANSWER_QUESTION:
            return {
                ...state,
                [action.title]: {
                    ...state[action.title],
                    answers: state[action.title].answers.concat([action.answer])
                }
            }
        case RESTART_QUIZ:
            return {
                ...state,
                [action.title]: {
                    ...state[action.title],
                    answers: []
                }
            }
        default: 
            return state
    }
}

export default decks;