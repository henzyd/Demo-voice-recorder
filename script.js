"use strict";

// const x = window.Navigator.prototype.mediaDevices;
// const x = window.navigator.mediaDevices.getUserMedia();
// console.log(x);

const y = window.navigator.mediaDevices.getUserMedia({
  audio: true,
  //   video: true,
});
console.log(y);
y.then((t) => {
  const p = new MediaRecorder(t);
  console.log(p);
  //   const data = p.ondataavailable.data; check if it is an arr
  const data = p.ondataavailable;
  console.log(data);
}).catch((t) => console.error(`${t}`));
