import { isEscapeKey, toggleModalElement } from './util.js';
import { validateForm, resetValidateForm } from './validation-form.js';
import { resetImageZoom } from './zoomer-image.js';
import { resetEffect } from './create-filters.js';
import { sendData } from './api.js';

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
const imageUploadOverlay = imageUploadForm.querySelector('.img-upload__overlay');
const imageUploadCancelButton = imageUploadForm.querySelector('.img-upload__cancel');
const effectPreviews = imageUploadForm.querySelectorAll('.effects__preview');
const submitButton = imageUploadOverlay.querySelector('.img-upload__submit');
const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const openUploadForm = () => {
  toggleModalElement(imageUploadOverlay);

  document.addEventListener('keydown', onDocumentKeydown);
};

const closeUploadForm = () => {
  toggleModalElement(imageUploadOverlay);

  document.removeEventListener('keydown', onDocumentKeydown);

  unblockSubmitButton();
  resetValidateForm();
  resetImageZoom();
  resetEffect();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) &&
    !evt.target.classList.contains('text__hashtags') &&
    !evt.target.classList.contains('text__description')
  ) {
    evt.preventDefault();
    closeUploadForm();
  }
}

const closeNotification = (evt) => {
  evt.stopPropagation();

  const existElement = document.querySelector('.success') || document.querySelector('.error');
  const closeButton = existElement.querySelector('button');

  if (evt.target === existElement || evt.target === closeButton || isEscapeKey(evt)) {
    existElement.remove();
    document.body.removeEventListener('click', onDocumentNotificationClick);
    document.body.removeEventListener('keydown', onDocumentNotificationKeydown);
  }
};

function onDocumentNotificationClick(evt) {
  closeNotification(evt);
}

function onDocumentNotificationKeydown(evt) {
  closeNotification(evt);
}

const appendNotification = (template, cb = null) => {
  cb?.();

  const notificationNode = template.cloneNode(true);

  document.body.append(notificationNode);
  document.body.addEventListener('click', onDocumentNotificationClick);
  document.body.addEventListener('keydown', onDocumentNotificationKeydown);
};

const sendFormData = async (formElement) => {
  const isValid = validateForm();

  if (isValid) {
    blockSubmitButton();
    try {
      await sendData(new FormData(formElement));
      appendNotification(successTemplate, () => closeUploadForm());
    } catch (err) {
      appendNotification(errorTemplate);
    } finally {
      unblockSubmitButton();
    }
  }
};

const onImageUploadInputChange = () => {
  const file = imageUploadInput.files[0];
  const image = imageUploadOverlay.querySelector('img');

  image.src = URL.createObjectURL(file);

  effectPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
  });

  openUploadForm();
};

const onImageUploadCancelButtonClick = () => {
  closeUploadForm();
};

const onImageUploadFormSubmit = (evt) => {
  evt.preventDefault();
  sendFormData(evt.target);
};

imageUploadInput.addEventListener('change', onImageUploadInputChange);
imageUploadCancelButton.addEventListener('click', onImageUploadCancelButtonClick);
imageUploadForm.addEventListener('submit', onImageUploadFormSubmit);

export { sendFormData };
