import {SEND_CHAT_MESSAGE, RECEIVE_CHAT_MESSAGE, TYPE_CHAT_MESSAGE} from './ChatboxTypes'

export const sendChatMessage = (data)=>{
    return {
        type: SEND_CHAT_MESSAGE,
        payload: data
    }
}

export const receiveChatMessage = (data)=>{
    return {
        type: RECEIVE_CHAT_MESSAGE ,
        payload: data
    }
}

export const typeChatMessage = (data)=>{
    return {
        type: TYPE_CHAT_MESSAGE,
        payload: data
    }
}