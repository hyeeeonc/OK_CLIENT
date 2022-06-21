let audio = new Audio("./assets/OkraBG.mp3");
audio.play();
audio.autoplay();

audio.addEventListener(
  "ended",
  function () {
    this.currentTime = 0;
    this.play();
  },
  false
);

window.onbeforeunload = function () {
  const time = audio.currentTime;
  console.log(time);
};

audio.addEventListener("pause", () => {
  console.log(audio.currentTime);
});
