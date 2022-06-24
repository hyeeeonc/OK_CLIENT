const hamburger = document.getElementById("hamburger-click");
const hamburgerCheckbox = document.getElementById("burger-check");

hamburger.addEventListener("click", () => {
  hamburgerCheckbox.click();
});

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

window.addEventListener("resize", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});
