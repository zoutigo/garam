import {combineReducers} from 'redux'
import {loginReducer} from './Connexion/ConnexionReducer'
import {chatMessagesReducer} from './Chatbox/ChatboxReducers'


export const rootReducer =  combineReducers({
    login: loginReducer,
    chatbox: chatMessagesReducer
})