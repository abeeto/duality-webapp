import React, { useState } from 'react';
import { ReactMic } from 'react-mic';
import axios from 'axios';
import { cloneSpeaker, tts } from '../voiceClone';

function MicUpload() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);

  const startRecording = () => {
    
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const onData = (recordedBlob) => {
    console.log('chunk of real-time data is: ', recordedBlob);
  };

  const onStop = (recordedBlob) => {
    console.log('recordedBlob is: ', recordedBlob);
    setRecordedBlob(recordedBlob);
  };

  const uploadRecording = async () => {
    if (recordedBlob) {
      const cloneSpeakerName = 'cloneSpeakerName'; // Replace with actual speaker name
      const [file, speakerName, speakerNames, embeddings] = await cloneSpeaker(recordedBlob.blob, cloneSpeakerName);
      handleGenerateAndPlay(speakerName,embeddings)
    }
  };

  const playAudio = (audioData) => {
    const audio = new Audio(`data:audio/wav;base64,${audioData}`);
    audio.play();
  };

  const handleGenerateAndPlay = async (speakerName, embeddings) => {
    console.log(embeddings)
    const text = 'This is what your cloned voice sounds like'; // Replace with the actual text
    const speakerType = 'Cloned'; // Replace with the actual speaker type
    const speakerNameStudio = 'Claribel Dervla'; // Replace with the actual studio speaker name
    const speakerNameCustom = speakerName; // Replace with the actual custom speaker name
    const lang = 'en'; // Replace with the actual language
  
    const audioData = await tts(text, speakerType, speakerNameStudio, speakerNameCustom, lang,embeddings);
    playAudio(audioData)
  };

  return (
    <div>
      <ReactMic
        record={isRecording}
        className="sound-wave"
        onStop={onStop}
        onData={onData}
        strokeColor="#000000"
        backgroundColor="#FF4081" />
      <button onClick={startRecording} type="button">Start</button>
      <button onClick={stopRecording} type="button">Stop</button>
      <button onClick={uploadRecording} type="button">Upload</button>
      {recordedBlob && <audio src={recordedBlob.blobURL} controls />}
    </div>
  );
}

export default MicUpload;