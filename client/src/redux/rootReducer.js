import {combineReducers} from 'redux'
import {loginReducer} from './Connexion/ConnexionReducer'


export const rootReducer =  combineReducers({
    login: loginReducer
})