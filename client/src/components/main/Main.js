import React from 'react'
import {BrowserRouter as Router, Route, Switch, NavLink} from 'react-router-dom'
import {Tab, Tabs} from 'react-bootstrap'


import {useState} from 'react'




function Main() {
    const [key, setKey] = useState('home')

    return (
       <Router>
           <main>
           {/* <nav className={`nav nav-pills flex-column flex-sm-row`}>
                    <NavLink className={`flex-sm-fill text-sm-center nav-link`} to="/">Home</NavLink>
                    <NavLink className={`flex-sm-fill text-sm-center nav-link`}  to="/users">Users</NavLink>
                    <NavLink className={`flex-sm-fill text-sm-center nav-link `}  to="/school">School</NavLink>
                    <NavLink className={`flex-sm-fill text-sm-center nav-link`}  to="/chatbox">Chat-box</NavLink>
                    
            </nav> */}
                    {/* <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                        <Tab eventKey="home" title="Home">
                            <Home />
                        </Tab>
                        <Tab eventKey="profile" title="Users">
                            <Users />
                        </Tab>
                        <Tab eventKey="contact" title="School" disabled>
                            <School />
                        </Tab>
                    </Tabs> */}

                    <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)}>
                        <Tab eventKey="home" title="Home">
                            Home
                        </Tab>
                        <Tab eventKey="users" title="Users">
                            Users
                        </Tab>
                        <Tab eventKey="school" title="School">
                           Schhol
                        </Tab>
                        <Tab eventKey="contact" title="Contact" disabled>
                            Chat
                        </Tab>
                        <Tab eventKey="loginForm" title="LoginForm">
                           Login
                        </Tab>
                        <Tab eventKey="textEditor" title="TextEditor">
                           text editor
                        </Tab>
                    </Tabs>
            <div>
                {/* <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route  path="/users">
                        <Users />
                    </Route>
                    <Route exact path="/school">
                        <School />
                    </Route>
                    <Route exact path="/products" component={Chatbox}>
                        
                    </Route>
                    <Route path="*">
                        <ErrorPage />
                    </Route>
              
            </Switch> */}

             </div>

           </main>
       </Router>
    )
}

export default Main
