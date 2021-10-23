import { ADD_CARD, ADD_TITLE, RECEIVE_DECKS } from "../actions";


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
                [action.title]: {title: action.title}
            }
        case ADD_CARD:
            return {
                ...state,
                [action.title]: {
                    ...state[action.title],
                    questions: state[action.title].questions.concat([action.card])

                }
            }
        default: 
            return state
    }
}

export default decks;