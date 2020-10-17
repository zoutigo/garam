import React from 'react'

import {useDispatch} from 'react-redux'
import { showLoginModal, showRegisterModal } from '../../redux'
import ReactDOM from 'react-dom';
import LoginModal from './LoginModal'
import {useSelector} from 'react-redux'
import RegisterModal from './RegisterModal';
import {useState} from 'react'

function HeadVisitor(props) {
   

    // const handleshow = ()=>{
    //     dispatch(showLoginModal())
    //     const container = document.createElement("div")
    //     document.body.appendChild(container)
    //     ReactDOM.render(
    //     <LoginModal />, 
    //     container)
    // }
    const dispatch = useDispatch()
    const handleShow = ()=> dispatch(showRegisterModal())

    const {connect} = props

    const [showModalRegister, setshowModalRegister] = useState(false)

    //const handleShow = ()=> setshowModalRegister(true)
    const handleClose = ()=> setshowModalRegister(false)

    const registerName = React.createRef()
    const registerEmail = React.createRef()
    const registerPassword = React.createRef()

    const Ids = {
        name: registerName ,
        email: registerEmail,
        password: registerPassword
    }

    
    return (
        <>
             <button className={`btn btn-success mx-2`}  >Se Connecter </button>

            <button className= {`btn btn-outline-warning mx-2`} onClick={handleShow}  >S'incrire</button>
             <RegisterModal show={showModalRegister} close= {handleClose}  refs={Ids} connect= {connect} />


    
        </>
    )
}

export default HeadVisitor
