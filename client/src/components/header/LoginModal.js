import qs from 'qs'
import React from 'react'
import { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Form, Modal, Button} from 'react-bootstrap'
import { isConnected, showLoginModal } from '../../redux'
import * as Yup from 'yup';
import { Formik } from 'formik'; // RoorMessage could also be called
const axios = require('axios')


const passRegExp = new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$')

const validationSchema = Yup.object().shape({
   
    email: Yup.string()
    .email("*Le login est une adresse mail")
    .max(100, "*login invalide")
    .required("*le login est obligatoire"),
    password: Yup.string()
    .matches(passRegExp, "*Password invalide")
    .required("*Le password est obligatoire")
   
  })

function LoginModal() {

        // manage the modal opening and closure
    const dispatch = useDispatch()
    const show = useSelector(state => state.login.loginModal)
    const close = ()=> dispatch(showLoginModal())


    // Manage error from the server
    const [serverError, setserverError] = useState([])

    const handleRequest = (data)=>{
        setserverError(
            serverError.push(data)
        )
        console.log(serverError.length)
        console.log(serverError[0])
      console.log(data)
    }

   

    return (
        <>
            <Formik
                    initialValues={{email:"", password:""}}
                    validationSchema={validationSchema}
                    onSubmit={(values, {setSubmitting, resetForm}) => {
                        // When button submit form and form is i the procss of submiting, submit button is disabled
                        // setSubmitting(true);
                       // console.log(JSON.stringify(values))

                        // send to back-end
                        let axiosConfig = {
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8',
                                "Access-Control-Allow-Origin": "*",
                            }
                          }
                        // axios.get('http://localhost:3200/users/login',values, axiosConfig)
                        axios.post('http://localhost:3200/users/login', JSON.stringify(values), axiosConfig)
                        .then((res)=> {
                            console.log(res.data)
                            setSubmitting(false);
                            
                            dispatch(showLoginModal())
                            dispatch(isConnected())
                           
                        })
                        .catch((err) => {
                            if (err.response) {
                                console.log(err.response.status)
                                console.log(err.response.data)
                                console.log(err.response.headers)
                            }
                            console.log(`L'erreur est ${err.status}`)
                           handleRequest(err.response.data)
                        })
                     
                    }}
                >
                
                {( {values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (

                <Form onSubmit={handleSubmit}>
                <Modal show={show}>
                <Modal.Header >
                <Modal.Title>Connectez vous et entre dans la salle</Modal.Title>
                <span onClick={close}>close</span>
                </Modal.Header>
                <Modal.Body>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Adresse mail</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder="Enter email" 
                                    name="email" 
                                    onChange={handleChange} 
                                    onBlur={handleBlur}
                                    value = {values.email}
                                    />
                                <Form.Text className="text-muted">
                                {touched.email && errors.email ?errors.email : '.' }
                                </Form.Text>
                               
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Password"
                                    name="password" 
                                    onChange={handleChange} 
                                    onBlur={handleBlur}
                                    value = {values.password}
                                />
                                 <Form.Text className="text-muted">
                                 {touched.password && errors.password ? errors.password: '.'}
                                </Form.Text>

                                <Form.Text className="text-muted">
                                { serverError[0] }
                                </Form.Text>
                               
                            </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={close}>
                    Fermer
                </Button>
                <Button variant="success" onClick={handleSubmit} type="submit" disabled={isSubmitting} >
                   Entrer dans l'arene
                </Button>
                </Modal.Footer>
            </Modal>
            </Form>
            
            )}

            </Formik>
        </>
      
    )
}

export default LoginModal
