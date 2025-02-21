const ALERT_SHOW_TIME = 5000;

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const errorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const error = errorTemplate.cloneNode(true);
  const errorTitle = error.querySelector('.data-error__title');
  errorTitle.textContent = message;
  document.body.append(error);

  setTimeout(() => {
    error.remove();
  }, ALERT_SHOW_TIME);
};

const toggleModalElement = (modalElement) => {
  modalElement.classList.toggle('hidden');
  document.body.classList.toggle('modal-open');
};

export {
  isEscapeKey,
  showAlert,
  toggleModalElement,
};
