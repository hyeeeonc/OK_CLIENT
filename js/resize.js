const main = document.querySelector(".pc");
document.addEventListener("DOMContentLoaded", () => {
  console.log("hi");
  if (window.innerWidth < 700) {
    setTimeout(() => main.remove(), 3000);
  }
});

let beforeWidth = window.innerWidth;
window.addEventListener("resize", () => {
  const nowWidth = window.innerWidth;
  if ((beforeWidth < 786 && nowWidth >= 786) || (beforeWidth > 786 && nowWidth <= 786)) {
    location.reload();
  }
  beforeWidth = nowWidth;
});
