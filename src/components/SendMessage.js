import React, { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { cloneSpeaker, tts } from '../voiceClone';
const SendMessage = () => {
  const [message, setMessage] = useState("");

  const playAudio = (audioData) => {
    return new Promise(resolve => {
      const audio = new Audio(`data:audio/wav;base64,${audioData}`);
      audio.addEventListener('ended', () => resolve());
      audio.play();
    });
  };

  const handleGenerateAndPlay = (text_in,speakerName, embeddings) => {
    const text = text_in; // Replace with the actual text
    const speakerType = 'Cloned'; // Replace with the actual speaker type
    const speakerNameStudio = 'Claribel Dervla'; // Replace with the actual studio speaker name
    const speakerNameCustom = speakerName; // Replace with the actual custom speaker name
    const lang = 'en'; // Replace with the actual language

    return new Promise((resolve, reject) => {
      tts(text, speakerType, speakerNameStudio, speakerNameCustom, lang,embeddings)
        .then(async (audioData) => {
          await playAudio(audioData)
          resolve()
        })
        .catch(error => reject(error))
    })
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "") {
      alert("Enter a valid message");
      return;
    }
    const { uid, displayName, photoURL } = auth.currentUser;
    await handleGenerateAndPlay(message.trim(),uid)
    await addDoc(collection(db, "messages"), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });
    setMessage(""); // This will now also clear the input field since its value is bound to `message`.
  };

  return (
    <form className="send-message" onSubmit={sendMessage}>
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="Type a message..."
        value={message} 
        onChange={(e) => setMessage(e.target.value)}/>
      <button type="submit">Send</button>
    </form>
  );
};

export default SendMessage;
