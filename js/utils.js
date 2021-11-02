// функция получение рандомного числа с плавающей запятой
function getRandomPositiveFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(digits);
}

// функция получение рандомного числа
function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

// функция добавления и удаления класса
const addClassOrRemoveClass = (element, addOrRemove, className) => {
  element.classList[addOrRemove === 'add' ? 'add' : 'remove'](className);
};

// функция добавления и удаления атрибута
const setAttributeOrRemoveAttribute = (element, setOrRemove, name, value) => {
  element[setOrRemove === 'set' ? 'setAttribute' : 'removeAttribute'](name, value);
};

// функция получения попапа ошибки
const getError = (message) => {
  const main = document.querySelector('main');
  const templateError = document.querySelector('#error').content.querySelector('.error');
  const error = templateError.cloneNode(true);
  const errorButton = error.querySelector('.error__button');
  const errorMessage = error.querySelector('.error__message');
  errorMessage.innerHTML = '';
  errorMessage.textContent = message;
  main.appendChild(error);
  addClassOrRemoveClass(error, 'remove', 'hidden');
  errorButton.addEventListener('click', () => {
    addClassOrRemoveClass(error, 'add', 'hidden');
  });
  window.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      addClassOrRemoveClass(error, 'add', 'hidden');
    }
  });
};

// функция получения попапа успешной отправки данных
const getSuccess = () => {
  const main = document.querySelector('main');
  const templateSuccess = document.querySelector('#success').content.querySelector('.success');
  const success = templateSuccess.cloneNode(true);
  main.appendChild(success);
  addClassOrRemoveClass(success, 'remove', 'hidden');
  window.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      addClassOrRemoveClass(success, 'add', 'hidden');
    }
  });
  window.addEventListener('click', () => {
    addClassOrRemoveClass(success, 'add', 'hidden');
  });
};

export {getRandomPositiveFloat, getRandomPositiveInteger, addClassOrRemoveClass, setAttributeOrRemoveAttribute, getError, getSuccess};
