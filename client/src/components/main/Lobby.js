import React, { useState, useEffect ,useRef} from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:2500";

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


        <div className={`container`}>
            {/* <div>{updates[0].name}</div> */}
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
                            return(
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td></td>
                                <td>{item.format.name} </td>
                                <td>{item.buyIn} </td>
                                <td></td>
                                <td></td>
                            </tr>
                            )
                        })
                    } 
                                
              </tbody>
            </table>
          
        </div>
    )
}

export default Lobby
