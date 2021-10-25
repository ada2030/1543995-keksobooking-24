function getRandomPositiveFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(digits);
}

function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const getArray = (elements) => {
  const randomArray = [];
  for (let i = 0; i < getRandomPositiveInteger(1, elements.length); i++) {
    randomArray[i] = elements[i];
  }
  return randomArray;
};

const addClass = (element, className) => {
  element.classList.add(className);
};

const removeClass = (element, className) => {
  element.classList.remove(className);
};

const disableElement = (element) => {
  element.setAttribute('disabled', 'disabled');
};

const turnOnElement = (element) => {
  element.removeAttribute('disabled', 'disabled');
};

const getError = (message) => {
  const main = document.querySelector('main');
  const templateError = document.querySelector('#error').content.querySelector('.error');
  const error = templateError.cloneNode(true);
  const errorButton = error.querySelector('.error__button');
  const errorMessage = error.querySelector('.error__message');
  errorMessage.innerHTML = '';
  errorMessage.textContent = message;
  main.appendChild(error);
  removeClass(error, 'hidden');
  errorButton.addEventListener('click', () => {
    addClass(error, 'hidden');
  });
};

export {getRandomPositiveFloat, getRandomPositiveInteger, getRandomArrayElement, getArray, getError, addClass, removeClass, disableElement, turnOnElement};
