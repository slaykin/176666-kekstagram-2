const DESCRIPTION_MAX_LENGTH = 140;

let errorMessage = '';

const getErrorMessage = () => errorMessage;

const setErrorMessage = (message) => {
  errorMessage = message;
};
const hashtagHandler = (value) => {
  const inputArray = value.trim().split(/\s+/);
  if (!value.trim()) {
    return true;
  }

  const validHashtagPattern = /^(?:(?:#([a-zA-Zа-яА-Я0-9]{1,19}))\s*){0,5}$/;
  const uniqueHashtags = new Set();

  for (const hashtag of inputArray) {
    const lowerTag = hashtag.toLowerCase();

    if (!validHashtagPattern.test(hashtag)) {
      setErrorMessage('Введён невалидный хэштег');
      return false;
    }

    if (uniqueHashtags.has(lowerTag)) {
      setErrorMessage('Хэштеги повторяются');
      return false;
    }
    uniqueHashtags.add(lowerTag);
  }

  setErrorMessage('');
  return true;
};
// Валидация дескрипшина
const descriptionHandler = (value) => {
  const descriptionText = value.trim();
  if (descriptionText.length > DESCRIPTION_MAX_LENGTH) {
    setErrorMessage(`длина комментария больше ${DESCRIPTION_MAX_LENGTH} символов`);
    return false;
  }
  setErrorMessage('');
  return true;
};

export { getErrorMessage, hashtagHandler, descriptionHandler };
