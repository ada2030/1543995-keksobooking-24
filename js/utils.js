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

// функции удаления обработчиков событий
// чет не получилось универсиализировать эти функции((, пусть пока так
let handleKeydownError = () => {};
const handleClickError = () => {
  error.remove();
  body.removeEventListener('click', handleClickError);
  body.removeEventListener('keydown', handleKeydownError);
};
handleKeydownError = () => {
  if (isEscapeKey) {
    error.remove();
    body.removeEventListener('keydown', handleKeydownError);
    body.removeEventListener('click', handleClickError);
  }
};
let handleKeydownSuccess = () => {};
const handleClickSuccess = () => {
  success.remove();
  body.removeEventListener('click', handleClickSuccess);
  body.removeEventListener('keydown', handleKeydownSuccess);
};
handleKeydownSuccess = () => {
  if (isEscapeKey) {
    success.remove();
    body.removeEventListener('click', handleClickSuccess);
    body.removeEventListener('keydown', handleKeydownSuccess);
  }
};

// функция получения попапа ошибки отправки данных
const getError = () => {
  main.appendChild(error);
  addClassOrRemoveClass(error, 'remove', 'hidden');
  errorButton.addEventListener('click', () => {
    error.remove();
  });
  body.addEventListener('keydown', handleKeydownError);
  body.addEventListener('click', handleClickError);
};

// функция получения попапа успешной отправки данных
const getSuccess = () => {
  main.appendChild(success);
  addClassOrRemoveClass(success, 'remove', 'hidden');
  body.addEventListener('keydown', handleKeydownSuccess);
  body.addEventListener('click', handleClickSuccess);
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

export {addClassOrRemoveClass, getError, getSuccess, showAlert};
