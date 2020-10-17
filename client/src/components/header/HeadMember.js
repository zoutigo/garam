
import React from 'react'
import {useDispatch} from 'react-redux'
import { isConnected } from '../../redux'


function HeadMember() {
    const dispatch = useDispatch()
    const handleShow = ()=> dispatch(isConnected())
    return (
        <div>
            <button className={`btn btn-info`} onClick={handleShow}>Se deconnecter</button>
        </div>
    )
}

export default HeadMember
