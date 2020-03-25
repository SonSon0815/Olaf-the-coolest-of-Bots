import { MessageHandler } from "./messageHandler";
const fs = require('fs');
const tempy = require('tempy');
import * as BrainState from './brainState'
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

export namespace WatsonTextToSpeech {

  export function textToSpeech(text) {
    return new Promise((resolve, reject) => {
      const ttsFile = tempy.file({ name: 'tts.ogg' });
      const textToSpeechInstance = new TextToSpeechV1({
        authenticator: new IamAuthenticator({
          apikey: process.env.TEXT_TO_SPEECH_APIKEY,
        }),
        url: process.env.TEXT_TO_SPEECH_URL,
      });
      const params = {
        text: text,
        accept: 'audio/ogg;codecs=opus',
      };

      // synthesizeUsingWebSocket returns a Readable Stream that can be piped or listened to
      const synthesizeStream = textToSpeechInstance.synthesizeUsingWebSocket(params);

      // the output of the stream can be piped to any writable stream, like an audio file
      synthesizeStream.pipe(fs.createWriteStream(ttsFile));

      // !!!!! IMPORTANT !!!!!
      // if the stream is not being piped anywhere and is only being listened to, the stream needs
      //   to be explicitly set to flowing mode by uncommenting the following line:

      // synthesizeStream.resume();

      // the 'message' event is emitted when data is processed and returned from the service
      // the 'message' parameter is the entire response frame of information returned from the
      //   service. it is mainly useful for debugging
      // the 'data' parameter is the data payload contained within the message. it is typically
      //   binary audio data, but if the text includes SSML marks or the request includes the
      //   'timings' parameter, 'data' could be a string containing marks or timing information
      synthesizeStream.on('message', (message, data) => {
        console.log(data);
      });

      // the 'error' event is emitted if there is an error during the connection
      // 'err' is the Error object describing the error
      synthesizeStream.on('error', err => {
        console.log(err);
      });

      // the 'close' event is emitted once, when the connection is terminated by the service
      // the 'code' parameter is the status code. 1000 is the code for a normal termination
      // the 'reason' parameter provides a string description of how the connection closed
      synthesizeStream.on('close', (code, reason) => {
        console.log(code);
        resolve(ttsFile);
      });
    });

  }

}
