import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Form, Modal, Button} from 'react-bootstrap'
import { isConnected, showRegisterModal } from '../../redux'
import * as Yup from 'yup';
import { Formik } from 'formik'; // RoorMessage could also be called
const axios = require('axios')

const passRegExp = new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$')

const validationSchema = Yup.object().shape({
    name: Yup.string()
    .min(2, "*Names must have at least 2 characters")
    .max(100, "*Names can't be longer than 100 characters")
    .required("*Name is required"),
    email: Yup.string()
    .email("*Must be a valid email address")
    .max(100, "*Email must be less than 100 characters")
    .required("*Email is required"),
    password: Yup.string()
    .matches(passRegExp, "*Password is not valid")
    .required("*Password number required")
   
  })


function RegisterModal(props) {
 
// manage the modal opening and closure
    const dispatch = useDispatch()
    const show = useSelector(state => state.login.registerModal)
    const close = ()=> dispatch(showRegisterModal())


    return (
        <>
            <Formik
                    initialValues={{ name:"", email:"", password:""}}
                    validationSchema={validationSchema}
                    onSubmit={(values, {setSubmitting, resetForm}) => {
                        // When button submit form and form is i the procss of submiting, submit button is disabled
                        // setSubmitting(true);
                      

                        // send to back-end
                        let axiosConfig = {
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8',
                                "Access-Control-Allow-Origin": "*",
                            }
                          }
                        axios.post('http://localhost:3200/users/create', JSON.stringify(values), axiosConfig)
                        .then((res)=> {
                            setSubmitting(false);
                            dispatch(showRegisterModal())
                            dispatch(isConnected())
                           
                        })
                        .catch((err) => {
                            console.log(err)
                        })

                        // Simulate submitting to database, shows us values submitted, resets form
                     
                    }}
                >
                
                {( {values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (

                <Form onSubmit={handleSubmit}>
                <Modal show={show}>
                <Modal.Header >
                <Modal.Title>Inscrivez vous tout de suite</Modal.Title>
                <span onClick={close}>close</span>
                </Modal.Header>
                <Modal.Body>

                                
                            <Form.Group controlId="formBasicName" >
                                <Form.Label>User Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter Name" 
                                    name="name" 
                                    onChange={handleChange} 
                                    onBlur={handleBlur}
                                    value = {values.name}
                                    />
                                <Form.Text className="text-muted">
                            Choisissez un nom assez rigolo
                                </Form.Text>
                                    {/* Applies the proper error message from validateSchema when the user has clicked the element and there is an error, also applies the .error-message CSS class for styling */}
                                    {touched.name && errors.name ? (
                                        <div className="error-message">{errors.name}</div>
                                    ): null}
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder="Enter email" 
                                    name="email" 
                                    onChange={handleChange} 
                                    onBlur={handleBlur}
                                    value = {values.email}
                                    />
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                                {touched.email && errors.email ? ( <div className="error-message">{errors.email}</div>): null}
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
                                Choose a very secret pass word.
                                </Form.Text>
                                {touched.password && errors.password ? ( <div className="error-message">{errors.password}</div>): null}
                            </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={close}>
                    Fermer
                </Button>
                <Button variant="success" onClick={handleSubmit} type="submit" disabled={isSubmitting} >
                    Devenir membre
                </Button>
                </Modal.Footer>
            </Modal>
            </Form>
            
            )}

            </Formik>
      </>
    )
}

export default RegisterModal
