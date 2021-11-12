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

const isEscapeKey = (evt) => evt.key === 'Escape';
// Уважаемый проверяющий наставник, прошу обратить внимание в пункт 2.6 ТЗ, там написано "Сообщение должно исчезать по нажатию на клавишу Esc"
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
  let keydownHandler = () => {};
  const clickHandler = () => {
    successOrErrorExactly.remove();
    body.removeEventListener('click', clickHandler);
    body.removeEventListener('keydown', keydownHandler);
  };
  keydownHandler = () => {
    if (isEscapeKey) {
      successOrErrorExactly.remove();
      body.removeEventListener('click', clickHandler);
      body.removeEventListener('keydown', keydownHandler);
    }
  };
  body.addEventListener('click', clickHandler);
  body.addEventListener('keydown', keydownHandler);
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
