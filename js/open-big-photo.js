
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

const openBigPicture = (photo) => {
  bigPictureBlock.classList.remove('hidden');

  bigPictureImg.src = photo.url;
  bigPictureCaption.textContent = photo.description;
  bigPictureLikesCount.textContent = photo.likes;
  bigPictureCommentShownCount.textContent = photo.comments.length;
  bigPictureCommentTotalCount.textContent = photo.comments.length;

  renderAllComments(photo.comments);

  bigPictureCommentCount.classList.add('hidden');
  bigPictureCommentsLoader.classList.add('hidden');

  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

onCloseButton.addEventListener('click', onCloseButtonClick);

export {openBigPicture};
