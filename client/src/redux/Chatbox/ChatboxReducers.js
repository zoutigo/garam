import {SEND_CHAT_MESSAGE, RECEIVE_CHAT_MESSAGE, TYPE_CHAT_MESSAGE} from './ChatboxTypes'

const initialState = {
    messages: [],
     message: {
        text: '',
        author: '',
        createdAt: ''
    }
   
}

export const chatMessagesReducer = (state=initialState, action)=>{
    switch (action.type) {
        case SEND_CHAT_MESSAGE:
           return {
            ...state,
                message: initialState.message
           }
        case RECEIVE_CHAT_MESSAGE :
            return {
                ...state,
                messages: [...state.messages, action.payload]
            } 
        case TYPE_CHAT_MESSAGE :
            return {
                ...state,
                    message: {
                        text: action.payload.text,
                        author: action.payload.author
                    }
            }   
    
        default:
            return state
    }
}