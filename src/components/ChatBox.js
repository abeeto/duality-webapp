import Message from "./Message";
import SendMessage from "./SendMessage";
import { useUser } from "./UserContextProvider"; // Ensure this import path is correct
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";


const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("");
  const roomInputRef = useRef(null);
  const user = useUser();
  const chatboxWindow = useRef(null);

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(50)
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setMessages(sortedMessages);
    });
    return () => unsubscribe;
  }, []);

  // useEffect to scroll to the very bottom of the chat window when a new message is added
  useEffect(() => {
    if (chatboxWindow.current) {
      const { current: chatBox } = chatboxWindow;
      chatBox.scrollTop = chatBox.scrollHeight; // Corrected scroll functionality
    }
  }, [messages]);

  return (
    <main className="chat-box">
      {room && user ? (
        <div className="room">
          <h2>Chatting with {room}</h2>
          <div className="chat-message-window" ref={chatboxWindow}>
            {messages?.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          </div>
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
