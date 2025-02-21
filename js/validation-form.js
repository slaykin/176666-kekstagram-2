import '../vendor/pristine/pristine.min.js';

const DESCRIPTION_MAX_LENGTH = 140;
const VALID_HASHTAG_PATTERN = /^(?:(?:#([a-zA-Zа-яА-Я0-9]{1,19}))\s*){0,5}$/;
const ERROR_MESSAGES = {
  invalidHashtag: 'Введён невалидный хэштег',
  duplicateHashtag: 'Хэштеги повторяются',
  descriptionTooLong: `Длина комментария больше ${DESCRIPTION_MAX_LENGTH} символов`,
};

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const textDescription = imgUploadForm.querySelector('.text__description');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');

let errorMessage = '';

const setErrorMessage = (message) => {
  errorMessage = message;
};

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const validateHashtag = (value) => {
  const inputArray = value.trim().split(/\s+/);
  if (!value.trim()) {
    return true;
  }

  const uniqueHashtags = new Set(inputArray.map((hashtag) => hashtag.toLowerCase()));

  if (uniqueHashtags.size > 5) {
    setErrorMessage(ERROR_MESSAGES.invalidHashtag);
    return false;
  }

  const isValid = [...uniqueHashtags].every((hashtag) => VALID_HASHTAG_PATTERN.test(hashtag));
  if (!isValid) {
    setErrorMessage(ERROR_MESSAGES.invalidHashtag);
    return false;
  }

  if (uniqueHashtags.size !== inputArray.length) {
    setErrorMessage(ERROR_MESSAGES.duplicateHashtag);
    return false;
  }

  setErrorMessage('');
  return true;
};

const validateDescription = (value) => {
  const descriptionText = value.trim();
  const isValid = descriptionText.length <= DESCRIPTION_MAX_LENGTH;

  setErrorMessage(isValid ? '' : ERROR_MESSAGES.descriptionTooLong);
  return isValid;
};

const onTextHashtagsInput = () => {
  submitButton.disabled = !pristine.validate();
};

const onTextDescriptionInput = () => {
  submitButton.disabled = !pristine.validate();
};

const validateForm = () => pristine.validate();

const resetValidateForm = () => {
  imgUploadInput.value = '';
  textHashtags.value = '';
  textDescription.value = '';
  pristine.reset();
};

pristine.addValidator(textHashtags, validateHashtag, () => errorMessage);
pristine.addValidator(textDescription, validateDescription, ERROR_MESSAGES.descriptionTooLong);

textHashtags.addEventListener('input', onTextHashtagsInput);
textDescription.addEventListener('input', onTextDescriptionInput);

export { validateForm, resetValidateForm };
