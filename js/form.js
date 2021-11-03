import {addClassOrRemoveClass, setAttributeOrRemoveAttribute, getError, getSuccess} from './utils.js';
import {sendData} from './api.js';
import {resetMapAndMarker} from './map.js';
const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const MAX_PRICE = 1000000;

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

// валидация тип жилья и цены до события
if (typeSelect.value === 'bungalow') {
  setAttributeOrRemoveAttribute(priceInput, 'set', 'placeholder', 0);
  setAttributeOrRemoveAttribute(priceInput, 'set', 'min', 0);
} else if (typeSelect.value === 'flat') {
  setAttributeOrRemoveAttribute(priceInput, 'set', 'placeholder', 1000);
  setAttributeOrRemoveAttribute(priceInput, 'set', 'min', 1000);
} else if (typeSelect.value === 'hotel') {
  setAttributeOrRemoveAttribute(priceInput, 'set', 'placeholder', 3000);
  setAttributeOrRemoveAttribute(priceInput, 'set', 'min', 3000);
} else if (typeSelect.value === 'house') {
  setAttributeOrRemoveAttribute(priceInput, 'set', 'placeholder', 5000);
  setAttributeOrRemoveAttribute(priceInput, 'set', 'min', 5000);
} else if (typeSelect.value === 'palace') {
  setAttributeOrRemoveAttribute(priceInput, 'set', 'placeholder', 10000);
  setAttributeOrRemoveAttribute(priceInput, 'set', 'min', 10000);
}

// валидация тип жилья и цены при событии
typeSelect.addEventListener('change', () => {
  const typeValue = typeSelect.value;
  if (typeValue === 'bungalow') {
    setAttributeOrRemoveAttribute(priceInput, 'set', 'placeholder', 0);
    setAttributeOrRemoveAttribute(priceInput, 'set', 'min', 0);
  } else if (typeValue === 'flat') {
    setAttributeOrRemoveAttribute(priceInput, 'set', 'placeholder', 1000);
    setAttributeOrRemoveAttribute(priceInput, 'set', 'min', 1000);
  } else if (typeValue === 'hotel') {
    setAttributeOrRemoveAttribute(priceInput, 'set', 'placeholder', 3000);
    setAttributeOrRemoveAttribute(priceInput, 'set', 'min', 3000);
  } else if (typeValue === 'house') {
    setAttributeOrRemoveAttribute(priceInput, 'set', 'placeholder', 5000);
    setAttributeOrRemoveAttribute(priceInput, 'set', 'min', 5000);
  } else if (typeValue === 'palace') {
    setAttributeOrRemoveAttribute(priceInput, 'set', 'placeholder', 10000);
    setAttributeOrRemoveAttribute(priceInput, 'set', 'min', 10000);
  }
});

// валидация Время заезда и выезда
timeInSelect.addEventListener('change', () => {
  const timeInValue = timeInSelect.value;
  if (timeInValue === '12:00') {
    timeOutSelect.value = '12:00';
  } else if (timeInValue === '13:00') {
    timeOutSelect.value = '13:00';
  } else if (timeInValue === '14:00') {
    timeOutSelect.value = '14:00';
  }
});
timeOutSelect.addEventListener('change', () => {
  const timeOutValue = timeOutSelect.value;
  if (timeOutValue === '12:00') {
    timeInSelect.value = '12:00';
  } else if (timeOutValue === '13:00') {
    timeInSelect.value = '13:00';
  } else if (timeOutValue === '14:00') {
    timeInSelect.value = '14:00';
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
      'https://24.javascript.pages.academy/keksobooking',
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
