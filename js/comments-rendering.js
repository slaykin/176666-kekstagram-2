const COMMENTS_STEP = 5;
let availableComments = [];
let commentShownCount = 0;

const bigPictureBlock = document.querySelector('.big-picture');
const bigPictureCommentShownCount = bigPictureBlock.querySelector('.social__comment-shown-count');
const bigPictureCommentTotalCount = bigPictureBlock.querySelector('.social__comment-total-count');
const bigPictureComments = bigPictureBlock.querySelector('.social__comments');
const bigPictureCommentTemplate = bigPictureBlock.querySelector('.social__comment');
const bigPictureCommentsLoader = bigPictureBlock.querySelector('.comments-loader');

const renderComment = ({ avatar, name, message }) => {
  const newComment = bigPictureCommentTemplate.cloneNode(true);
  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;
  return newComment;
};

const renderFullComments = () => {
  const fragment = new DocumentFragment;
  const nextComments = availableComments.slice(0, COMMENTS_STEP);
  availableComments = availableComments.slice(COMMENTS_STEP);
  nextComments.forEach((comment) => {
    fragment.append(renderComment(comment));
    commentShownCount++;
  });
  bigPictureComments.append(fragment);

  bigPictureCommentShownCount.textContent = commentShownCount;
  if (availableComments.length <= 0) {
    bigPictureCommentsLoader.classList.add('hidden');
  }
};

const renderComments = (arrayOfComments) => {
  bigPictureCommentTotalCount.textContent = arrayOfComments.length;
  bigPictureComments.textContent = '';
  availableComments = [...arrayOfComments];
  renderFullComments();
};

const clearComments = () => {
  commentShownCount = 0;
  bigPictureCommentsLoader.classList.remove('hidden');
};

bigPictureCommentsLoader.addEventListener('click', renderFullComments);

export {renderComments, clearComments};
