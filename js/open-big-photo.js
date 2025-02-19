import { renderComments, clearComments } from './comments-rendering.js';
import { IsEscapeKey, toggleModalElement } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImage = bigPicture.querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.social__comment-total-count');
const socialCaption = bigPicture.querySelector('.social__caption');

const editBigPicture = (photo) => {
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;
  bigPictureImage.src = photo.url;
  bigPictureImage.alt = photo.description;
};

const openBigPicture = (photo) => {
  document.addEventListener('keydown', onDocumentKeydown);

  toggleModalElement(bigPicture);
  clearComments();
  editBigPicture(photo);
  renderComments(photo.comments);
};

const closeBigPicture = () => {
  document.removeEventListener('keydown', onDocumentKeydown);

  toggleModalElement(bigPicture);
};

function onDocumentKeydown(evt) {
  if (IsEscapeKey(evt)) {
    evt.preventDefault();

    closeBigPicture();
  }
}

const onBigPictureCloseButtonClick = () => {
  closeBigPicture();
};

bigPictureCloseButton.addEventListener('click', onBigPictureCloseButtonClick);

export { openBigPicture };
