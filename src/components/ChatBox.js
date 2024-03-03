import Message from "./Message";
import SendMessage from "./SendMessage";
import { useUser } from "./UserContextProvider"; // Ensure this import path is correct
import { useEffect, useRef, useState, useContext } from "react";
import { db } from "../firebase";
import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import MicUpload from "./MicUpload";
import { AudioContext } from "./AudioContextProvider";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);

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
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [messages]);

  const {isAudioSubmitted} = useContext(AudioContext);

  return (
    <main className="chat-box">
      {isAudioSubmitted && user ? (
        <div className="room">
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
          <p>Record your voice to train our models.<br/><br/>Read this sentence:


 If this is true then those who tend to think creatively really are somehow different.
          </p>
          
          <MicUpload/>
        </div>
      )}
    </main>
  );
};

export default ChatBox;
