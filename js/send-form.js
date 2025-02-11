import { IsEscapeKey } from './util.js';
import { hashtagHandler, getErrorMessage as getHashtagError, descriptionHandler, getErrorMessage as getDescriptionError } from './validation-form.js';

const imageUploadForm = document.querySelector('.img-upload__form');
const userImage = imageUploadForm.querySelector('.img-upload__input');
const imageEditForm = imageUploadForm.querySelector('.img-upload__overlay');
const imageUploadCancelButton = imageUploadForm.querySelector('.img-upload__cancel');
const hashtagField = imageUploadForm.querySelector('.text__hashtags');
const descriptionField = imageUploadForm.querySelector('.text__description');
const imageUploadFormSubmitButton = imageUploadForm.querySelector('.img-upload__submit');

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const openImageUploadForm = () => {
  imageUploadFormSubmitButton.disabled = false;
  imageEditForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.body.addEventListener('keydown', onDocumentKeydown);
};

const onUserImageChange = () => {
  openImageUploadForm();
};

const closeImageUploadForm = () => {
  imageEditForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.body.removeEventListener('keydown', onDocumentKeydown);
  pristine.reset();
  imageUploadForm.reset();
};

const onImageUploadCancelButtonClick = (evt) => {
  evt.preventDefault();
  closeImageUploadForm();
};

function onDocumentKeydown (evt) {
  if (IsEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === hashtagField || document.activeElement === descriptionField) {
      evt.stopPropagation();
    } else {
      closeImageUploadForm();
    }
  }
}

const toggleSubmitButton = () => {
  imageUploadFormSubmitButton.disabled = !pristine.validate();
};

pristine.addValidator(hashtagField, hashtagHandler, getHashtagError);
hashtagField.addEventListener('input', toggleSubmitButton);

pristine.addValidator(descriptionField, descriptionHandler, getDescriptionError);
descriptionField.addEventListener('input', toggleSubmitButton);

userImage.addEventListener('change', onUserImageChange);
imageUploadCancelButton.addEventListener('click', onImageUploadCancelButtonClick);
