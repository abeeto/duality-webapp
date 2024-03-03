import axios from 'axios';
let STUDIO_SPEAKERS = {};

try{
    console.log('Getting metadata from server ...');
    const languagesResponse = await axios.get(`/languages`);
    const LANGUAGES = languagesResponse.data;
    console.log('Available languages:', LANGUAGES.join(', '));

    const studioSpeakersResponse = await axios.get(`/studio_speakers`);
    STUDIO_SPEAKERS = studioSpeakersResponse.data;
    console.log('Available studio speakers:', Object.keys(STUDIO_SPEAKERS).join(', '));
} catch (error) {
    console.log("Serevr not running prob");
}

export async function cloneSpeaker(audioBlob, cloneSpeakerName, clonedSpeakerNames) {
    const formData = new FormData();
    formData.append('wav_file', audioBlob, `${audioBlob.lastModifiedDate}.wav`);
  
    const response = await fetch(`/clone_speaker`, {
      method: 'POST',
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    const embeddings = await response.json();
    clonedSpeakerNames.push(cloneSpeakerName);
  
    return [audioBlob, cloneSpeakerName, clonedSpeakerNames, embeddings];
  }