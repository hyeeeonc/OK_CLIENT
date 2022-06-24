const pc = document.querySelector(".pc");
const mobile = document.querySelector(".mobile");
const mainVideo = document.getElementById("main-video");
const mainVideo2 = document.getElementById("main-video2");
document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth < 768) {
    pc.remove();
  } else {
    mobile.remove();
    mainVideo2.setAttribute("src", mainVideo.dataset.src);
  }
});

let beforeWidth = window.innerWidth;
window.addEventListener("resize", () => {
  const nowWidth = window.innerWidth;
  if ((beforeWidth < 768 && nowWidth >= 768) || (beforeWidth > 767 && nowWidth <= 767)) {
    location.reload();
    beforeWidth = nowWidth;
  } else {
    beforeWidth = nowWidth;
  }
});
