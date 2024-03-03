import React, { useState } from 'react';
import { ReactMic } from 'react-mic';
import axios from 'axios';
import { cloneSpeaker } from '../voiceClone';

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
      console.log(file, speakerName, speakerNames, embeddings);
    }
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