import React from 'react'

import {useDispatch} from 'react-redux'
import { showLoginModal, showRegisterModal } from '../../redux'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal';
import {useState} from 'react'

function HeadVisitor(props) {
   

    const dispatch = useDispatch()

    const handleShowRegisterModal = ()=> dispatch(showRegisterModal())
    const handleShowLoginModal = () => dispatch(showLoginModal())

    const {connect} = props

    const [showModalRegister, setshowModalRegister] = useState(false)
    const [showModalLogin, setshowModalLogin] = useState(false)

    //const handleShow = ()=> setshowModalRegister(true)
    const handleClose = ()=> setshowModalRegister(false)

    
    return (
        <>
             <button className={`btn btn-success mx-2`} onClick={handleShowLoginModal} >Se Connecter </button>
             <LoginModal show={showModalLogin} close= {handleClose}   connect= {connect} />


            <button className= {`btn btn-outline-warning mx-2`} onClick={handleShowRegisterModal}  >S'incrire</button>
             <RegisterModal show={showModalRegister} close= {handleClose}   connect= {connect} />

    
        </>
    )
}

export default HeadVisitor
