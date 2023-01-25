import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector(".gallery");
const galleryCards = createGalleryItem(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", galleryCards);

galleryContainer.addEventListener("click", onGalletyContainerClick);

function createGalleryItem(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join("");
}

function onGalletyContainerClick(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== "IMG") {
    return;
  }

  const instance = basicLightbox.create(
    `
  <div class="modal">
  <img src="${evt.target.dataset.source}" width="800" height="600">
  </div>
  `,
    {
      onShow: (instance) => {
        instance.element().querySelector(".modal").onclick = instance.close;
      },
    }
  );

  instance.show();

  galleryContainer.addEventListener("keydown", onCloseModal);

  function onCloseModal(evt) {
    if (evt.code === "Escape") {
      instance.close();
    }

    galleryContainer.removeEventListener("keydown", onCloseModal);
  }
}
