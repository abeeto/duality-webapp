import React, { useState, useRef } from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { useUser } from "./UserContextProvider"; // Ensure this import path is correct

const ChatBox = () => {
  const [room, setRoom] = useState("");
  const roomInputRef = useRef(null);
  const user = useUser();

  //TO DO: redirect to welcome page if user is not logged in
  return (
    <main className="chat-box">
      {room && user ? (
        <div className="room">
          <h2>Chatting with {room}</h2>
          <Message />
          <SendMessage />
        </div>
      ) : (
        <div className="no-room">
          <h2>Welcome to Duality</h2>
          <p>Type a username to start chatting with them</p>
          <div>
            <input 
              type="text" 
              placeholder="Enter username to chat with" 
              ref={roomInputRef} 
            />
            <button onClick={() => setRoom(roomInputRef.current.value)}>
              Talk with user
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default ChatBox;
