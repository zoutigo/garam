import React, { useEffect , useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {receiveChatMessage, sendChatMessage, typeChatMessage} from '../../redux/Chatbox/ChatboxActions'
import io from 'socket.io-client'
import ScrollToBottom from 'react-scroll-to-bottom'
let socket ;
const ENDPOINTCHAT = "http://localhost:2600";


function Chat() {
   
    const dispatch = useDispatch()
  

    const [message, setMessage] = useState('')
    const [author, setAuthor] = useState('Geremy')
    const [messages, setMessages] = useState([])
  
    
    useEffect(() => {
        socket = io(ENDPOINTCHAT)
        
        socket.emit('join',{message:'hello i am a new user', author} )

        return () =>{
            socket.emit('disconnect')
            socket.off()
        }
    }, [ENDPOINTCHAT]);


    useEffect(()=>{
        socket.on('message', (message)=>{
            setMessages([...messages, message])
           
        })
        return () =>{
            socket.emit('disconnect')
            socket.off()
        }
    },[messages])


    const handleSubmit = (e)=>{
        e.preventDefault()
       if (message) {
        const  doc = {
            message: message,
            author: author,
            createdAt: Date.now()
            }
        socket.emit('client-message', doc, ()=>{
            setMessage('')
        }) 
       }
       
 }

    return (
        <>
            <h1>Chat Box</h1>
            <div className={`chat-messages`}>
             
                        {
                            messages.map((msg ,i)=>{
                            return ( 
                                 <div key={i} className={`chat-message-box`}>
                                    <p className="chat-message-text"> {msg.message}</p>
                                    <div className="chat-message-author">{msg.author} {msg.createdAt}</div>  
                                </div>)
                            })
                        }
               
            </div>
            
            <div className={`chat-form`}>
                <form onSubmit={handleSubmit}>
                    <input type="text"
                     value={message} 
                     onChange={(e)=>{
                        console.log(e.target.value)
                        setMessage(e.target.value)
                         }}
                     onKeyPress={(e)=> e.key==='Enter' ? handleSubmit : null}
                     >

                    </input>
                    <button type="submit" onSubmit={handleSubmit}> Envoyer le message</button>
                </form>
                   
            </div>
        </>
    )
}

export default Chat
