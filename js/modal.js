const modalKorea = document.querySelector(".modal-korea");
const korea = document.querySelector("#south_korea");

korea.addEventListener("mouseover", () => {
  modalKorea.style.animation = "fade-in 2s";
  modalKorea.style.display = "block";
});

korea.addEventListener("mouseout", () => {
  modalKorea.style.display = "none";
});

const modalUsa = document.querySelector(".modal-usa");
const usa = document.querySelector("#usa");

usa.addEventListener("mouseover", () => {
  modalUsa.style.display = "block";
});

usa.addEventListener("mouseout", () => {
  modalUsa.style.display = "none";
});

const modalChina = document.querySelector(".modal-china");
const china = document.querySelector("#china");

china.addEventListener("mouseover", () => {
  modalChina.style.display = "block";
});

china.addEventListener("mouseout", () => {
  modalChina.style.display = "none";
});

const modalUk = document.querySelector(".modal-uk");
const uk = document.querySelector("#britain");

uk.addEventListener("mouseover", () => {
  modalUk.style.display = "block";
});

uk.addEventListener("mouseout", () => {
  modalUk.style.display = "none";
});

const modalVietnam = document.querySelector(".modal-vietnam");
const vietnam = document.querySelector("#vietnam");

vietnam.addEventListener("mouseover", () => {
  modalVietnam.style.display = "block";
});

vietnam.addEventListener("mouseout", () => {
  modalVietnam.style.display = "none";
});

const modalThailand = document.querySelector(".modal-thailand");
const thailand = document.querySelector("#thailand");

thailand.addEventListener("mouseover", () => {
  modalThailand.style.display = "block";
});

thailand.addEventListener("mouseout", () => {
  modalThailand.style.display = "none";
});
