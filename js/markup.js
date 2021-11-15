import {addClassOrRemoveClass} from './utils.js';

const TypeTranslate = {BUNGALOW: 'Бунгало', FLAT: 'Квартира', HOTEL: 'Отель', HOUSE: 'Дом', PALACE: 'Дворец'};
const template = document.querySelector('#card').content.querySelector('.popup');
const templatePhoto = document.querySelector('#card').content.querySelector('.popup__photo');

// функция ставки данных в шаблон
const appendData = (author, offer) => {
  const element = template.cloneNode(true);
  const photoItem = templatePhoto.cloneNode(true);
  if (offer.title === undefined) {
    addClassOrRemoveClass(element.querySelector('.popup__title'), 'add', 'hidden');
  } else {
    element.querySelector('.popup__title').textContent = offer.title;
  }
  if (offer.address === undefined) {
    addClassOrRemoveClass(element.querySelector('.popup__text--address'), 'add', 'hidden');
  } else {
    element.querySelector('.popup__text--address').textContent = offer.address;
  }
  if (offer.price === undefined) {
    addClassOrRemoveClass(element.querySelector('.popup__text--price'), 'add', 'hidden');
  } else {
    element.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  }
  let advertType;
  for (const item in TypeTranslate) {
    if (item.toLowerCase() === offer.type) {
      advertType = TypeTranslate[item];
    }
  }
  if (offer.type === undefined) {
    addClassOrRemoveClass(element.querySelector('.popup__type'), 'add', 'hidden');
  } else {
    element.querySelector('.popup__type').textContent = advertType;
  }
  if (offer.rooms === undefined || offer.guests === undefined) {
    addClassOrRemoveClass(element.querySelector('.popup__text--capacity'), 'add', 'hidden');
  } else {
    element.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  }
  if (offer.checkin === undefined || offer.checkout === undefined) {
    addClassOrRemoveClass(element.querySelector('.popup__text--time'), 'add', 'hidden');
  } else {
    element.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  }
  if (offer.features === undefined) {
    addClassOrRemoveClass(element.querySelector('.popup__features'), 'add', 'hidden');
  } else {
    element.querySelector('.popup__features').querySelectorAll('.popup__feature').forEach((item) => {
      addClassOrRemoveClass(item, 'add', 'hidden');
    });
    offer.features.forEach((itemData) => {
      element.querySelector('.popup__features').querySelectorAll('.popup__feature').forEach((itemElement) => {
        if(itemElement.className.indexOf(itemData) !== -1) {
          addClassOrRemoveClass(itemElement, 'remove', 'hidden');
        }
      });
    });
  }
  if (offer.description === undefined) {
    addClassOrRemoveClass(element.querySelector('.popup__description'), 'add', 'hidden');
  } else {
    element.querySelector('.popup__description').textContent = offer.description;
  }
  if (offer.photos === undefined) {
    addClassOrRemoveClass(element.querySelector('.popup__photos'), 'add', 'hidden');
  } else {
    offer.photos.forEach((photo) => {
      photoItem.src = photo;
      element.querySelector('.popup__photos').innerHTML = '';
      element.querySelector('.popup__photos').appendChild(photoItem);
    });
  }
  if (author.avatar === undefined) {
    addClassOrRemoveClass(element.querySelector('.popup__avatar'), 'add', 'hidden');
  } else {
    element.querySelector('.popup__avatar').src = author.avatar;
  }
  return element;
};

export {appendData};
