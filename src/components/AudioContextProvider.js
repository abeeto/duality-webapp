import React, { createContext, useState } from 'react';

export const AudioContext = createContext();

export const AudioContextProvider = (props) => {
  const [isAudioSubmitted, setAudioSubmitted] = useState(false);
  return (
    <AudioContext.Provider value={{ isAudioSubmitted, setAudioSubmitted }}>
      {props.children}
    </AudioContext.Provider>
  );
};

