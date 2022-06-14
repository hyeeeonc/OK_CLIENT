const domain = "api.okraseoul.com";

const thumbnailSection = document.getElementById("thumbnail-section");

window.onload = async () => {
  const res = await fetch(`https://${domain}/api/v1/thumbnails`);
  const thumbnails = await res.json();
  thumbnailSection.innerHTML += `<div class="ar"><input class="prev" type="image" src="./assets/leftar.png" /></div>`;

  const thumbnailWindow = document.createElement("div");
  thumbnailWindow.id = "window";

  const thumbnailContainer = document.createElement("div");
  thumbnailContainer.className = "thumbnail-container";

  thumbnails.forEach((t) => {
    thumbnailContainer.innerHTML += `<div class="thumbnail-cell"> 
      ${t.thumbnail}
      </div>`;
  });
  // <a href="board.okraseoul.com/${t.postId}>       </a>

  thumbnailWindow.appendChild(thumbnailContainer);
  thumbnailSection.appendChild(thumbnailWindow);

  thumbnailSection.innerHTML += `<div class="ar"><input class="next" type="image" src="./assets/rightar.png" /></div>`;

  const container = document.querySelector(".thumbnail-container");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const length = Number(thumbnails.length);

  (function addEvent() {
    prevBtn.addEventListener("click", translateContainer.bind(this, 1));
    nextBtn.addEventListener("click", translateContainer.bind(this, -1));
  })();

  function translateContainer(direction) {
    const selectedBtn = direction === 1 ? "prev" : "next";
    container.style.transitionDuration = "300ms";
    container.style.transform = `translateX(${direction * (100 / length)}%)`;
    container.ontransitionend = () => reorganizeEl(selectedBtn);
  }

  function reorganizeEl(selectedBtn) {
    container.removeAttribute("style");
    selectedBtn === "prev" ? container.insertBefore(container.lastElementChild, container.firstElementChild) : container.appendChild(container.firstElementChild);
  }
};
