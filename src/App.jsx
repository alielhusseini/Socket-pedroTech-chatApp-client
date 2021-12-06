import { useState } from 'react'
import './App.css'
import io from 'socket.io-client' // this will be used to establish a connection
import Chat from './Chat'

const socket = io.connect('http://localhost:5000') // connecting to the socketio server

function App() {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(true)

  const joinRoom = () => {
    if (username !== "" && room !== "") {

      // emitting an event for joining
      socket.emit("join_room", room)
      setShowChat(false)
    }
  }

  return (
    <div className="App">
      { showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input type="text" value={username} placeholder='Username...' onChange={e => setUsername(e.target.value)}/>
          <input type="text" value={room} placeholder='Room id...' onChange={e => setRoom(e.target.value)}/>
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : ( <Chat socket={ socket } username={ username } room={ room}/>)}
    </div>
  );
}

export default App;
