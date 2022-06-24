const pc = document.querySelector(".pc");
const mobile = document.querySelector(".mobile");
document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth < 768) {
    pc.remove();
  } else {
    mobile.remove();
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
