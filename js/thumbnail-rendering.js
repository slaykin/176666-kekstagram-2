import { photos } from './create-photo-and-description.js';

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const pictures = document.querySelector('.pictures');
const pictureFragment = document.createDocumentFragment();
const similarPhotos = photos;

similarPhotos.forEach((photo) => {
  const { id, url, description, comments, likes } = photo;
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.dataset.pictureId = id;
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureFragment.appendChild(pictureElement);
});

pictures.appendChild(pictureFragment);

