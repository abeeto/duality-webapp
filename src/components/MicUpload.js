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
        { recordedBlob ? 
          <>
            <div className='record-preview'>
              <audio src={recordedBlob.blobURL} controls />
            </div>
            <div className='record-controls'>
              <button className = 'record-button-default' onClick={() => setRecordedBlob(null)} type="button">Record Again</button>
              <button className = 'record-button-default' onClick={uploadRecording} type="button">Upload</button>
            </div> 
          </>
        :
        <>
          <div className='record-preview'>
            <ReactMic
              record={isRecording}
              className="recorder-preview"
              onStop={onStop}
              onData={onData}
              strokeColor="#fff"
              backgroundColor="#64a1b7" />
          </div>
          <div className='record-controls'>
            {
              isRecording ? 
              <button className = 'record-button-default' onClick={stopRecording} type="button">Stop</button>
              : 
              <button className = 'record-button-default' onClick={startRecording} type="button">Start</button>
            }
          </div> 
        </>
        }     
      </div> 
  );
}

export default MicUpload;