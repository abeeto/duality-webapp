import React, { useState } from 'react';
import { ReactMic } from 'react-mic';
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
    <div className='record-container'>
      <ReactMic
        record={isRecording}
        className="sound-wave"
        onStop={onStop}
        onData={onData}
        strokeColor="#fff"
        backgroundColor="#1c2c4c" />
      <div className='record-controls'>
        <button className = 'button-default' onClick={startRecording} type="button">Start</button>
        <button className = 'button-default' onClick={stopRecording} type="button">Stop</button>
        <button className = 'button-default' onClick={uploadRecording} type="button">Upload</button>
      </div> 
      {recordedBlob && <audio src={recordedBlob.blobURL} controls />}
    </div>
  );
}

export default MicUpload;