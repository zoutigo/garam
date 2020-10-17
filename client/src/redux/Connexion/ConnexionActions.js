import {SHOW_LOGIN_MODAL, SHOW_REGISTER_MODAL, IS_CONNECTED, SUBMIT_REGISTER_FORM} from './ConnexionTypes'

export const showLoginModal = ()=> {
    return {
        type: SHOW_LOGIN_MODAL
    }
}

export const showRegisterModal = ()=> {
    return {
        type: SHOW_REGISTER_MODAL
    }
}

export const isConnected = ()=> {
    return {
        type: IS_CONNECTED
    }
}

export const submitRegisterForm =(datas) => {
    return {
        type: SUBMIT_REGISTER_FORM,
        payload: datas
    }
}