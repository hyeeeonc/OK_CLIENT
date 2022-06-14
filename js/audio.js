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
