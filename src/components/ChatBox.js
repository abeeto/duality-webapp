import React from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";

const ChatBox = () => {
  const [room, setRoom] = React.useState(false);
  const roomInputRef = React.useRef(null);
  return (
    <main className="chat-box">
      {room? 
      (<>
      <div className="messages-wrapper">
        <Message />
      </div>
      <SendMessage />
      </>
      ) : (
      <>
        <div className="no-room">
          <h2>Welcome to Chat</h2>
          <p>Select a room to start chatting</p>
          <input type="text" placeholder="Enter username to chat with" ref={roomInputRef}/>
          <button onClick={() => setRoom(roomInputRef.current.value)}>Talk with user</button>
        </div>
      </>
      )}
    </main>
  );
};

export default ChatBox;