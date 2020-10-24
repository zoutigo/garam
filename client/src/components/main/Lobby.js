import React, { useState, useEffect ,useRef} from "react";
import socketIOClient from "socket.io-client";
import Chat from './Chat'
const ENDPOINT = "http://localhost:2600";

function Lobby() {
    const [response, setResponse] = useState("")
    const [updates, setUpdates] = useState([])
    const socketRef = useRef();
    // Create the socket
    // and add the API listener:
    useEffect(() => {
        socketRef.current = socketIOClient(ENDPOINT);
        socketRef.current.on("FromAPI", setResponse);
        return () => socketRef.current.disconnect();
    }, []);

    useEffect(() => {
        const handleLobbyUpdate =  (datas) => {
           // console.log(updates); // this will now display the current data
            setUpdates(datas);
        };
        socketRef.current.on('lobbyUpdate', handleLobbyUpdate);
        
        return () => {
            socketRef.current.off('lobbyUpdate', handleLobbyUpdate);
        }
    }, [updates]);

    return (


        <div className={`container d-flex`}>
            <section className={`chat-box`}>
                 <Chat />
            </section>
           
            <section>
            <table>
                <caption>
                    The time is : {response} 
                   
                </caption>
              <thead>
                  <tr>
                      <th> Name</th>
                      <th> Variant</th>
                      <th> Format </th>
                      <th> Buy In</th>
                      <th> Current players</th>
                      <th> Total Stack </th>

                  </tr>
              </thead>
              <tbody>
                  
                  
                    {
                        updates.map((item, index)=> {
                            let stack = 0
                            item.currentPlayers.map(player => stack += player.wallet)
                            return(
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.variante.name}</td>
                                <td>{item.format.name} </td>
                                <td>{item.buyIn} </td>
                            <td>{item.currentPlayers.length} / {item.variante.maxPlayers}</td>
                                <td>{stack} </td>
                            </tr>
                            )
                        })
                    } 
                                
              </tbody>
            </table>
            </section>
            <section>

            </section>
           
           
          
        </div>
    )
}

export default Lobby
