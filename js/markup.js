import {addClassOrRemoveClass} from './utils.js';

const template = document.querySelector('#card').content.querySelector('.popup');
const templatePhoto = document.querySelector('#card').content.querySelector('.popup__photo');

const TypeTranslate = {BUNGALOW: 'Бунгало', FLAT: 'Квартира', HOTEL: 'Отель', HOUSE: 'Дом', PALACE: 'Дворец'};

// функция ставки данных в шаблон
const appendData = (data) => {
  const element = template.cloneNode(true);
  const containerPhotos = element.querySelector('.popup__photos');
  const popupTitle = element.querySelector('.popup__title');
  const popupAddress = element.querySelector('.popup__text--address');
  const popupPrice = element.querySelector('.popup__text--price');
  const popupType = element.querySelector('.popup__type');
  const popupCapacity = element.querySelector('.popup__text--capacity');
  const popupTime = element.querySelector('.popup__text--time');
  const popupFeatures = element.querySelector('.popup__features');
  const popupDescription = element.querySelector('.popup__description');
  const popupPhotos = element.querySelector('.popup__photos');
  const popupAvatar = element.querySelector('.popup__avatar');
  if (data.offer.title === undefined) {
    addClassOrRemoveClass(popupTitle, 'add', 'hidden');
  } else {
    popupTitle.textContent = data.offer.title;
  }
  if (data.offer.address === undefined) {
    addClassOrRemoveClass(popupAddress, 'add', 'hidden');
  } else {
    popupAddress.textContent = data.offer.address;
  }
  if (data.offer.price === undefined) {
    addClassOrRemoveClass(popupPrice, 'add', 'hidden');
  } else {
    popupPrice.textContent = `${data.offer.price} ₽/ночь`;
  }
  for (const item in TypeTranslate) {
    if (item.toLowerCase() === data.offer.type) {
      data.offer.type = TypeTranslate[item];
    }
  }
  if (data.offer.type === undefined) {
    addClassOrRemoveClass(popupType, 'add', 'hidden');
  } else {
    popupType.textContent = data.offer.type;
  }
  if (data.offer.rooms === undefined || data.offer.guests === undefined) {
    addClassOrRemoveClass(popupCapacity, 'add', 'hidden');
  } else {
    popupCapacity.textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;
  }
  if (data.offer.checkin === undefined || data.offer.checkout === undefined) {
    addClassOrRemoveClass(popupTime, 'add', 'hidden');
  } else {
    popupTime.textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;
  }
  if (data.offer.features === undefined) {
    addClassOrRemoveClass(popupFeatures, 'add', 'hidden');
  } else {
    popupFeatures.textContent = data.offer.features;
  }
  if (data.offer.description === undefined) {
    addClassOrRemoveClass(popupDescription, 'add', 'hidden');
  } else {
    popupDescription.textContent = data.offer.description;
  }
  if (data.offer.photos === undefined) {
    addClassOrRemoveClass(popupPhotos, 'add', 'hidden');
  } else {
    data.offer.photos.forEach((photo) => {
      const photoItem = templatePhoto.cloneNode(true);
      photoItem.src = photo;
      containerPhotos.innerHTML = '';
      containerPhotos.appendChild(photoItem);
    });
  }
  if (data.author.avatar === undefined) {
    addClassOrRemoveClass(popupAvatar, 'add', 'hidden');
  } else {
    popupAvatar.src = data.author.avatar;
  }
  return element;
};
// вроде бы много повторений, но нсли честно вообще без понятий как можно еще упростить((

export {appendData};
