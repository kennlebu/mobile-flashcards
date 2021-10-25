import { ADD_CARD, ADD_TITLE, ANSWER_QUESTION, DELETE_DECK, RECEIVE_DECKS, RESTART_QUIZ, SELECT_DECK } from "../actions";


function decks(state = {}, action) {
    switch(action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                decks: {
                    ...action.decks
                }
            }
        case ADD_TITLE:
            return {
                ...state,
                decks: {
                    ...state.decks,
                    [action.title]: {
                        title: action.title,
                        questions: [],
                        answers: []
                    }
                }
            }
        case ADD_CARD:
            return {
                ...state,
                decks: {
                    ...state.decks,
                    [action.title]: {
                        ...state.decks[action.title],
                        questions: state.decks[action.title].questions.concat([action.card])
    
                    }
                }
            }
        case DELETE_DECK:
            let newDecks = Object.assign({}, state.decks)
            delete newDecks[action.title]
            return {
                ...state,
                decks: {
                    ...newDecks
                }
            }
        case ANSWER_QUESTION:
            return {
                ...state,
                decks: {
                    ...state.decks,
                    [action.title]: {
                        ...state.decks[action.title],
                        answers: state.decks[action.title].answers.concat([action.answer])
                    }
                }
            }
        case RESTART_QUIZ:
            return {
                ...state,
                decks: {
                    ...state.decks,
                    [action.title]: {
                        ...state.decks[action.title],
                        answers: []
                    }
                }
                
            }
        case SELECT_DECK:
            return {
                ...state,
                _selected_: {
                    ...state.decks[action.title]
                }
            }
        default: 
            return state
    }
}

export default decks;