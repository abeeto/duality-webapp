import React from "react";

const Message = ({message}) => {
  return (
    <div className={`chat-bubble`}>
      <img className="chat-bubble__left" src="" alt="user avatar" />
      <div className="chat-bubble__right">
        <p className="user-name">abeeto</p>
        <p className="user-message">
          {message.text}
        </p>
      </div>
    </div>
  );
};

export default Message;