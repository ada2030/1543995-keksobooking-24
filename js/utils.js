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

// функция получения попапа ошибки отправки данных
const getError = () => {
  main.appendChild(error);
  addClassOrRemoveClass(error, 'remove', 'hidden');
  errorButton.addEventListener('click', () => {
    error.remove();
  });
  body.addEventListener('keydown', () => {
    if (isEscapeKey) {
      error.remove();
    }
  });
  body.addEventListener('click', () => {
    error.remove();
  });
};

// функция получения попапа успешной отправки данных
const getSuccess = () => {
  main.appendChild(success);
  addClassOrRemoveClass(success, 'remove', 'hidden');
  body.addEventListener('keydown', () => {
    if (isEscapeKey) {
      success.remove();
    }
  });
  body.addEventListener('click', () => {
    success.remove();
  });
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
