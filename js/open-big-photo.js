import { photos } from './create-photo-and-description.js';
import { IsEscapeKey } from './util.js';

const bigPictureBlock = document.querySelector('.big-picture');
const bigPictureImg = bigPictureBlock.querySelector('.big-picture__img img');
const bigPictureCaption = bigPictureBlock.querySelector('.social__caption');
const bigPictureLikesCount = bigPictureBlock.querySelector('.likes-count');
const bigPictureCommentCount = bigPictureBlock.querySelector('.social__comment-count');
const bigPictureCommentShownCount = bigPictureBlock.querySelector('.social__comment-shown-count');
const bigPictureCommentTotalCount = bigPictureBlock.querySelector('.social__comment-total-count');
const bigPictureComments = bigPictureBlock.querySelector('.social__comments');
const bigPictureCommentTemplate = bigPictureBlock.querySelector('.social__comment');
const bigPictureCommentsLoader = bigPictureBlock.querySelector('.comments-loader');
const onCloseButton = bigPictureBlock.querySelector('.big-picture__cancel');

const renderComment = (comment) => {
  const { avatar, name, message } = comment;
  const newComment = bigPictureCommentTemplate.cloneNode(true);
  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;
  return newComment;
};

const renderAllComments = (arrayOfComments) => {
  bigPictureComments.textContent = '';
  const fragment = new DocumentFragment;
  arrayOfComments.forEach((comment) => fragment.append(renderComment(comment)));
  bigPictureComments.append(fragment);
};

const closeBigPicture = () => {
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
  bigPictureCommentShownCount.textContent = selectedPicture.comments.length;
  bigPictureCommentTotalCount.textContent = selectedPicture.comments.length;

  renderAllComments(selectedPicture.comments);

  bigPictureCommentCount.classList.add('hidden');
  bigPictureCommentsLoader.classList.add('hidden');

  document.body.classList.add('modal-open');

  onCloseButton.addEventListener('click', onCloseButtonClick);
  document.body.addEventListener('keydown', onDocumentKeydown);
};

export {openBigPicture};
