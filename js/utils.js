const body = document.querySelector('body');
const main = document.querySelector('main');
const templateError = document.querySelector('#error').content.querySelector('.error');
const error = templateError.cloneNode(true);
const errorButton = error.querySelector('.error__button');
const templateSuccess = document.querySelector('#success').content.querySelector('.success');
const success = templateSuccess.cloneNode(true);

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

// функция получения попапа ошибки
const getError = () => {
  main.appendChild(error);
  addClassOrRemoveClass(error, 'remove', 'hidden');
  errorButton.addEventListener('click', () => {
    error.remove();
  });
  body.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      // не очень понял про утилитарную функцию, если тебе не сложно можешь примерчик написать пожалуйста, просто до меня не доходит
      error.remove();
    }
  });
};

// функция получения попапа успешной отправки данных
const getSuccess = () => {
  main.appendChild(success);
  addClassOrRemoveClass(success, 'remove', 'hidden');
  body.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      success.remove();
    }
  });
  body.addEventListener('click', () => {
    success.remove();
  });
};

export {getRandomPositiveFloat, getRandomPositiveInteger, addClassOrRemoveClass, getError, getSuccess};
