const domain = "api.okraseoul.com";

const thumbnailSection = document.getElementById("thumbnail-section");
const thumbnailSectionMobile = document.getElementById("thumbnail-section-mobile");

const routeToPost = (postId) => {
  location.href = `https://board.okraseoul.com/${postId}`;
};

window.onload = async () => {
  const urlSearch = new URLSearchParams(location.search);
  if (matchMedia("screen and (min-width: 768px)").matches) {
    const section = urlSearch.get("section");

    const scrollToContact = () => {
      document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
    };

    if (section) {
      scrollToContact();
    }
  } else {
  }

  const res = await fetch(`https://${domain}/api/v1/thumbnails`);
  let thumbnails = await res.json();
  thumbnailSection.innerHTML += `<div class="ar"><input class="prev" type="image" src="./assets/leftar.png" /></div>`;
  thumbnailSectionMobile.innerHTML += `<div class="ar"><input class="prev" type="image" src="./assets/leftar.png" /></div>`;

  thumbnails = [].concat(thumbnails[thumbnails.length - 1], thumbnails.slice(0, thumbnails.length - 1));

  const thumbnailWindow = document.createElement("div");
  thumbnailWindow.id = "window";

  const thumbnailContainer = document.createElement("div");
  thumbnailContainer.className = "thumbnail-container";

  thumbnails.forEach((t) => {
    thumbnailContainer.innerHTML += `<div class="thumbnail-cell" onclick="routeToPost(${t.postId})" style="cursor:pointer;"> 
      ${t.thumbnail}
      </div>`;
  });

  thumbnailWindow.appendChild(thumbnailContainer);
  const deviceCheck = document.querySelector(".pc");
  if (deviceCheck) {
    thumbnailSection.appendChild(thumbnailWindow);
  } else {
    thumbnailSectionMobile.appendChild(thumbnailWindow);
  }

  thumbnailSection.innerHTML += `<div class="ar"><input class="next" type="image" src="./assets/rightar.png" /></div>`;
  thumbnailSectionMobile.innerHTML += `<div class="ar"><input class="next" type="image" src="./assets/rightar.png" /></div>`;

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

  // Board
  const resp = await fetch(`https://${domain}/api/v1/posts_enabled?size=16`);
  let postList = await resp.json();
};
