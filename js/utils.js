const ALERT_SHOW_TIME = 5000;
const body = document.querySelector('body');
const main = document.querySelector('main');
const templateError = document.querySelector('#error').content.querySelector('.error');
const error = templateError.cloneNode(true);
const errorButton = error.querySelector('.error__button');
const templateSuccess = document.querySelector('#success').content.querySelector('.success');
const success = templateSuccess.cloneNode(true);

// функция добавления и удаления класса
const addClassOrRemoveClass = (element, addOrRemove, className) => {
  element.classList[addOrRemove === 'add' ? 'add' : 'remove'](className);
};

// функция получения попапа успешной/ошибочной отправки данных
const getSuccessOrError = (successOrError) => {
  const successOrErrorExactly = successOrError === 'error' ? error : success;
  main.appendChild(successOrErrorExactly);
  addClassOrRemoveClass(successOrErrorExactly, 'remove', 'hidden');
  if (successOrError === 'error') {
    errorButton.addEventListener('click', () => {
      error.remove();
    });
  }
  const eventHandler = (evt) => {
    const isEscapeKey = () => evt.key === 'Escape';
    if (isEscapeKey() || evt.type === 'click') {
      successOrErrorExactly.remove();
      successOrErrorExactly.removeEventListener('click', eventHandler);
      body.removeEventListener('keydown', eventHandler);
    }
  };
  successOrErrorExactly.addEventListener('click', eventHandler);
  body.addEventListener('keydown', eventHandler);
};

// функция получения сообщения ошибки получения данных
const showAlert = () => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = 'Ошибка получения данных от сервера';

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {addClassOrRemoveClass, getSuccessOrError, showAlert, debounce};
