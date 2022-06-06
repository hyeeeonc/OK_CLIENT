const domain = "49.50.174.103:3000";

const thumbnailSection = document.getElementById("thumbnail-section");

window.onload = async () => {
  const res = await fetch(`http://${domain}/api/v1/thumbnails`);
  const thumbnails = await res.json();
  thumbnailSection.innerHTML += `<img class="ar" src="./assets/leftar.png" />`;
  thumbnails.forEach((t) => {
    thumbnailSection.innerHTML += `<div class="thumbnail-container">
        ${t.thumbnail}
      </div>`;
  });
  thumbnailSection.innerHTML += `<img class="ar" src="./assets/rightar.png" />`;
};
