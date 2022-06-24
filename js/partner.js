const mdContent = document.getElementById("md-content");
const mdText = document.getElementById("md-text");

window.addEventListener("load", () => {
  setTimeout(() => {
    mdText.style.display = "block";
    mdContent.style.width = "";
    mdContent.style.maxWidth = "590.05px";
  }, 1100);
});
