const DESCRIPTION_MAX_LENGTH = 140;
const VALID_HASHTAG_PATTERN = /^(?:(?:#([a-zA-Zа-яА-Я0-9]{1,19}))\s*){0,5}$/;
const ERROR_MESSAGES = {
  invalidHashtag: 'Введён невалидный хэштег',
  duplicateHashtag: 'Хэштеги повторяются',
  descriptionTooLong: `Длина комментария больше ${DESCRIPTION_MAX_LENGTH} символов`,
};

let errorMessage = '';

const getErrorMessage = () => errorMessage;

const setErrorMessage = (message) => {
  errorMessage = message;
};


const validateHashtag = (value) => {
  const inputArray = value.trim().split(/\s+/);
  if (!value.trim()) {
    return true;
  }

  const uniqueHashtags = new Set(inputArray.map((hashtag) => hashtag.toLowerCase()));

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

// Валидация дескрипшина
const validateDescription = (value) => {
  const descriptionText = value.trim();
  const isValid = descriptionText.length <= DESCRIPTION_MAX_LENGTH;

  setErrorMessage(isValid ? '' : ERROR_MESSAGES.descriptionTooLong);

  return isValid;
};

export { getErrorMessage, validateHashtag, validateDescription };
