import {addClassOrRemoveClass, getSuccessOrError} from './utils.js';
import {sendData} from './api.js';
import {resetMapAndMarker} from './map.js';
const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const MAX_PRICE = 1000000;
const MinPriceByType = {BUNGALOW: 0, FLAT: 1000, HOTEL: 3000, HOUSE: 5000, PALACE: 10000};

const form = document.querySelector('.ad-form');
const formButton = form.querySelector('.ad-form__submit');
const resetButton = form.querySelector('.ad-form__reset');
const interactiveElements = form.querySelectorAll('.ad-form__element');
const titleInput = form.querySelector('#title');
const priceInput = form.querySelector('#price');
const roomsSelect = form.querySelector('#room_number');
const guestsSelect = form.querySelector('#capacity');
const typeSelect = form.querySelector('#type');
const timeInSelect = form.querySelector('#timein');
const timeOutSelect = form.querySelector('#timeout');
const formFilters = document.querySelector('.map__filters');
const mapFilters = formFilters.querySelectorAll('.map__filter');
const mapFeatures = formFilters.querySelector('.map__features');
const container = document.querySelector('.map__canvas');

// валидация заголовка объявления
titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;
  if (valueLength < MIN_NAME_LENGTH) {
    titleInput.setCustomValidity(`Ещё ${  MIN_NAME_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${  valueLength - MAX_NAME_LENGTH } симв.`);
  } else {
    titleInput.setCustomValidity('');
  }
  titleInput.reportValidity();
});

// валидация цены
priceInput.addEventListener('input', () => {
  const priceValue = priceInput.value;
  if (priceValue > MAX_PRICE) {
    priceInput.setCustomValidity(`Цена за ночь не может быть выше ${MAX_PRICE} рублей`);
  } else {
    priceInput.setCustomValidity('');
  }
  priceInput.reportValidity();
});

// валидация селектов количество комнат и количество мест
formButton.addEventListener('click', () => {
  const roomsValue = Number(roomsSelect.value);
  const guestValue = Number(guestsSelect.value);
  if (roomsValue === 100 && guestValue !== 0) {
    guestsSelect.setCustomValidity('100 комнат не для гостей');
  } else if (roomsValue < guestValue) {
    guestsSelect.setCustomValidity('Количество гостей не может быть больше количества комнат');
  } else {
    guestsSelect.setCustomValidity('');
  }
});

// функция валидации поля цены
const validatePrice = () => {
  for (const item in MinPriceByType) {
    if (item.toLowerCase() === typeSelect.value) {
      priceInput.min = MinPriceByType[item];
      priceInput.placeholder = MinPriceByType[item];
    }
  }
};

// валидация тип жилья и цены до события
validatePrice();

// валидация тип жилья и цены при событии
typeSelect.addEventListener('change', () => {
  validatePrice();
});

// валидация Время заезда и выезда
timeInSelect.addEventListener('change', () => {
  timeOutSelect.value = timeInSelect.value;
});
timeOutSelect.addEventListener('change', () => {
  timeInSelect.value = timeOutSelect.value;
});

// приведение форм в неактивное состояние
addClassOrRemoveClass(form, 'add', 'ad-form--disabled');
interactiveElements.forEach((element) => {
  element.disabled = 'disabled';
});
addClassOrRemoveClass(formFilters, 'add', 'map__filters--disabled');
mapFilters.forEach((element) => {
  element.disabled = 'disabled';
});
mapFeatures.disabled = 'disabled';

// функция переключения формы в активное состояние
const activateForm = () => {
  addClassOrRemoveClass(form, 'remove', 'ad-form--disabled');
  interactiveElements.forEach((element) => {
    element.disabled = '';
  });
  addClassOrRemoveClass(formFilters, 'remove', 'map__filters--disabled');
  mapFilters.forEach((element) => {
    element.disabled = '';
  });
  mapFeatures.disabled = '';
  addClassOrRemoveClass(container, 'remove', 'hidden');
};

// функция обработки события submit
const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      'https://24.javascript.pages.academy/keksobooking',
      () => onSuccess(),
      () => getSuccessOrError('error'),
      new FormData(evt.target),
    );
  });
};

// функция сброса формы
const getInitial = () => {
  form.reset();
  formFilters.reset();
  resetMapAndMarker();
  getSuccessOrError('success');
  validatePrice();
};

// обработчик события для кнопки очистить
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  form.reset();
  formFilters.reset();
  resetMapAndMarker();
  validatePrice();
});

setUserFormSubmit(getInitial);

export {activateForm};
