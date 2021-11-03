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
const getError = () => {
  const main = document.querySelector('main');
  const templateError = document.querySelector('#error').content.querySelector('.error');
  const error = templateError.cloneNode(true);
  const errorButton = error.querySelector('.error__button');
  main.appendChild(error);
  addClassOrRemoveClass(error, 'remove', 'hidden');
  errorButton.addEventListener('click', () => {
    error.remove();
    window.removeEventListener('keydown', () => {});
  });
  window.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      error.remove();
      errorButton.removeEventListener('click', () => {});
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
    if (evt.key === 'Escape') {
      success.remove();
      window.removeEventListener('click', () => {});
    }
  });
  window.addEventListener('click', () => {
    success.remove();
    window.removeEventListener('keydown', () => {});
  });
};

export {getRandomPositiveFloat, getRandomPositiveInteger, addClassOrRemoveClass, setAttributeOrRemoveAttribute, getError, getSuccess};
