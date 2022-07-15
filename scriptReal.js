"use strict";
// All the Buttons
const start = document.querySelector(".start");
const play = document.querySelector(".play");
const pause = document.querySelector(".pause");
const download = document.querySelector(".download");
const audioSource = document.querySelector(".audio-source");

let arrFromBlob = [];
let processedStream;

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
      };

      processedStream.onstop = () => {
        const stoppedAudio = new Blob(arrFromBlob, {
          mimetype: "audio/webm",
        });
        //   audioSource.baseURI = stoppedAudio;
        arrFromBlob = [];
        const x = window.URL.createObjectURL(stoppedAudio);
        console.log(x);
        audioSource.src = x;
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
});
