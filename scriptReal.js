"use strict";
// All the Buttons
const start = document.querySelector(".start");
const play = document.querySelector(".play");
const pause = document.querySelector(".pause");
const download = document.querySelector(".download");
const audioSource = document.querySelector(".audio-source");

const body = document.querySelector("body");

let arrFromBlob = [];
let processedStream;
let audioURL = "";

// this is me making it start on load; you could make it start after the button is clicked

if (
  window.navigator.mediaDevices &&
  window.navigator.mediaDevices.getUserMedia
) {
  console.log("Recording has started");
  window.navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((accept) => {
      processedStream = new MediaRecorder(accept);
      console.log(processedStream);

      processedStream.ondataavailable = (e) => {
        arrFromBlob.push(e.data);
        console.log(arrFromBlob);
      };

      processedStream.onstop = () => {
        // const stoppedAudio = new Blob(arrFromBlob, {
        //   mimetype: "audio/webm",
        // });
        const stoppedAudio = new Blob(arrFromBlob, {
          mimetype: "audio/webm",
        });
        arrFromBlob = [];
        audioURL = window.URL.createObjectURL(stoppedAudio);
        console.log(audioURL);
        audioSource.src = audioURL;
        console.log(typeof audioSource.src);
      };
    })
    .catch((error) => console.error(`Failure ${error}`));
} else {
  console.log("Not working");
}

start.addEventListener("click", () => {
  processedStream.start();
  console.log(processedStream);
});

pause.addEventListener("click", () => {
  processedStream.stop();
  console.log(processedStream);
  audioSource.src = audioURL;
});
