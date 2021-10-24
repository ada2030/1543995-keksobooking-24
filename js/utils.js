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

const hiddenElement = (element) => {
  element.classList.add('hidden');
};

const visibleElement = (element) => {
  element.classList.remove('hidden');
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
  visibleElement(error);
  errorButton.addEventListener('click', () => {
    hiddenElement(error);
  });
};

export {getRandomPositiveFloat, getRandomPositiveInteger, getRandomArrayElement, getArray, getError};
