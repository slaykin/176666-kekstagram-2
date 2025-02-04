import { photos } from './create-photo-and-description.js';
import { IsEscapeKey } from './util.js';
import { renderComments, clearComments } from './comments-rendering.js';

const bigPictureBlock = document.querySelector('.big-picture');
const bigPictureImg = bigPictureBlock.querySelector('.big-picture__img img');
const bigPictureCaption = bigPictureBlock.querySelector('.social__caption');
const bigPictureLikesCount = bigPictureBlock.querySelector('.likes-count');
const onCloseButton = bigPictureBlock.querySelector('.big-picture__cancel');

const closeBigPicture = () => {
  clearComments();
  bigPictureBlock.classList.add('hidden');
  document.body.classList.remove('modal-open');
  onCloseButton.removeEventListener('click', onCloseButtonClick);
  document.body.removeEventListener('keydown', onDocumentKeydown);
};

function onCloseButtonClick (evt) {
  evt.preventDefault();
  closeBigPicture();
}

function onDocumentKeydown (evt) {
  if (IsEscapeKey(evt)) {
    closeBigPicture();
  }
}

const openBigPicture = (pictureId) => {
  bigPictureBlock.classList.remove('hidden');
  const selectedPicture = photos.find((photo) => photo.id === +pictureId);

  bigPictureImg.src = selectedPicture.url;
  bigPictureCaption.textContent = selectedPicture.description;
  bigPictureLikesCount.textContent = selectedPicture.likes;

  renderComments(selectedPicture.comments);

  document.body.classList.add('modal-open');

  onCloseButton.addEventListener('click', onCloseButtonClick);
  document.body.addEventListener('keydown', onDocumentKeydown);
};

export {openBigPicture};
