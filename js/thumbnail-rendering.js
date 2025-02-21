import { openBigPicture } from './open-big-photo.js';

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainter = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

const getThumbnail = (photo) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  const image = thumbnail.querySelector('.picture__img');

  thumbnail.href = photo.url;
  thumbnail.dataset.id = photo.id;

  image.src = photo.url;
  image.alt = photo.description;

  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;

  const onThumbnailClick = (evt) => {
    evt.preventDefault();
    openBigPicture(photo);
  };

  thumbnail.addEventListener('click', onThumbnailClick);

  return thumbnail;
};

const renderThumbnails = (photos) => {
  const thumbnails = picturesContainter.querySelectorAll('a.picture');
  thumbnails.forEach((thumbnail) => thumbnail.remove());

  photos.forEach((photo) => fragment.append(getThumbnail(photo)));

  picturesContainter.append(fragment);
};

export { renderThumbnails };
