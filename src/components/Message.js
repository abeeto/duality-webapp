import React from "react";
import {auth} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaRegPlayCircle } from "react-icons/fa";
import { FaRegCircleStop }  from "react-icons/fa6";

const ButtonIconToggle = () => { 
  const [isToPlay, setIsToPlay] = React.useState(true);

  //useEffect to setIsToPlay to true when setIsToPlay is false for 10 seconds
  React.useEffect(() => {
    if (!isToPlay) {
      const timeout = setTimeout(() => {
        setIsToPlay(true);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [isToPlay]);

  return (
    <button className="icon-button" onClick={() => {setIsToPlay(false)}}> 
      {isToPlay ? 
      <FaRegPlayCircle size={'30px'} color="#4c768d"/>
      :
      <FaRegCircleStop size={'30px'} color="#800000"/>
      }
    </button> 
  );
}



const Message = ({message}) => {
  const [user] = useAuthState(auth);

  return (
    <div className="chat-bubble-group">
      <div
        className={`chat-bubble ${message.uid === user.uid ? "right" : ""}`}>
        <img
          className="chat-bubble__left"
          src={message.avatar}
          alt="user avatar"
        />
        <div className="chat-bubble__right">
          <p className="user-name">{message.name}</p>
          <p className="user-message">{message.text}</p>
        </div>
      </div>
      <ButtonIconToggle/>
    </div>
  );
};
export default Message;
