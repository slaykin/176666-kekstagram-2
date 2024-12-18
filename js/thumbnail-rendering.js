import { photos } from './create-photo-and-description';

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const pictureFragment = document.createDocumentFragment();
const similarPhotos = photos();

similarPhotos.forEach(({url, description, likes, comments,}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureFragment.appendChild(pictureElement);
});

export {pictureFragment};
