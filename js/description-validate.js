const MAX_SYMBOLS = 140;

let errorMessage = '';
const descriptionError = () => errorMessage;

const descriptionHandler = (value) => {
  errorMessage = '';
  if (!value) {
    return true;
  }
  const rules = [
    {
      check: value.length > MAX_SYMBOLS,
      error: `Количество символов не должно превышать ${MAX_SYMBOLS}`,
    },
  ];
  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

export {descriptionHandler, descriptionError};
