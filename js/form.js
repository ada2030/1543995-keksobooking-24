import {addClassOrRemoveClass, setAttributeOrRemoveAttribute, getError, getSuccess} from './utils.js';
import {sendData} from './api.js';
import {resetMapAndMarker} from './map.js';
const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const MAX_PRICE = 1000000;

const form = document.querySelector('.ad-form');
const formButton = form.querySelector('.ad-form__submit');
const resetButton = form.querySelector('.ad-form__reset');
const container = document.querySelector('.map__canvas');
const interactiveElements = form.querySelectorAll('.ad-form__element');
const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');
const roomsSelect = document.querySelector('#room_number');
const guestsSelect = document.querySelector('#capacity');
const formFilters = document.querySelector('.map__filters');
const mapFilters = formFilters.querySelectorAll('.map__filter');
const mapFeatures = formFilters.querySelector('.map__features');

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

// приведение форм в неактивное состояние
addClassOrRemoveClass(form, 'add', 'ad-form--disabled');
interactiveElements.forEach((element) => {
  setAttributeOrRemoveAttribute(element, 'set','disabled', 'disabled');
});
addClassOrRemoveClass(formFilters, 'add', 'map__filters--disabled');
mapFilters.forEach((element) => {
  setAttributeOrRemoveAttribute(element, 'set','disabled', 'disabled');
});
setAttributeOrRemoveAttribute(mapFeatures, 'set','disabled', 'disabled');

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => onSuccess(),
      () => getError('Не удалось отправить форму. Попробуйте ещё раз'),
      new FormData(evt.target),
    );
  });
};

// функция сброса формы
const getInitial = () => {
  form.reset();
  formFilters.reset();
  resetMapAndMarker();
  getSuccess();
};

// обработчик события для кнопки очистить
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  form.reset();
  formFilters.reset();
  resetMapAndMarker();
});

setUserFormSubmit(getInitial);

// функция переключения формы в активное состояние
const activateForm = () => {
  addClassOrRemoveClass(form, 'remove', 'ad-form--disabled');
  interactiveElements.forEach((element) => {
    setAttributeOrRemoveAttribute(element, 'remove','disabled', 'disabled');
  });
  addClassOrRemoveClass(formFilters, 'remove', 'map__filters--disabled');
  mapFilters.forEach((element) => {
    setAttributeOrRemoveAttribute(element, 'remove','disabled', 'disabled');
  });
  setAttributeOrRemoveAttribute(mapFeatures, 'remove','disabled', 'disabled');
  addClassOrRemoveClass(container, 'remove', 'hidden');
};

export {activateForm};
