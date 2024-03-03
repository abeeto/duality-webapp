import axios from 'axios';
let STUDIO_SPEAKERS = {};
let cloned_speakers = {};

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
    console.log(embeddings)
  
    return [audioBlob, cloneSpeakerName, clonedSpeakerNames, embeddings];
  }

export async function tts(text, speakerType, speakerNameStudio, speakerNameCustom, lang, embeddings) {
    if(embeddings === undefined){
        embeddings = cloned_speakers[speakerNameCustom]
        if(embeddings === undefined){
            console.log('Embeddings not found')
            return
        }
        console.log(cloned_speakers)
    } else {
    cloned_speakers[speakerNameCustom] = embeddings;
    }
    //const embeddings = speakerType === 'Studio' ? STUDIO_SPEAKERS[speakerNameStudio] : embeddings;
  
    const response = await fetch(`/tts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
        language: lang,
        speaker_embedding: embeddings.speaker_embedding,
        gpt_cond_latent: embeddings.gpt_cond_latent,
      }),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    
    const generatedAudio = JSON.parse(await response.text());
    return generatedAudio;
  }