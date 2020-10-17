import {IS_CONNECTED, SHOW_REGISTER_MODAL, SHOW_LOGIN_MODAL, SUBMIT_REGISTER_FORM} from './ConnexionTypes'

const initialState = {
    connected: true,
    loginModal: false,
    registerModal: false,
    registeredDatas : {
        name: '',
        email: '',
        password: ''
    }
}

export const loginReducer = (state = initialState , action) => {
    switch (action.type) {

        case IS_CONNECTED:
            return {
                ...state,
                connected: !state.connected
            }
            


        case SHOW_LOGIN_MODAL :
            return {
                ...state,
                loginModal : !state.loginModal
            }
                

        case SHOW_REGISTER_MODAL :
            return {
                ...state,
                registerModal: !state.registerModal
            }
        case SUBMIT_REGISTER_FORM :
            return {
                ...state,
                registeredDatas :{
                    name: action.payload.name ,
                    email: action.payload.email ,
                    password: action.payload.password
                }

            }

            
    
        default: return state
        
    }
}