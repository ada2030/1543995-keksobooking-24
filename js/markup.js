import {addClassOrRemoveClass} from './utils.js';

const template = document.querySelector('#card').content.querySelector('.popup');
const templatePhoto = document.querySelector('#card').content.querySelector('.popup__photo');

const TypeTranslate = {BUNGALOW: 'Бунгало', FLAT: 'Квартира', HOTEL: 'Отель', HOUSE: 'Дом', PALACE: 'Дворец'};

// функция ставки данных в шаблон
const appendData = (author, offer) => {
  const element = template.cloneNode(true);
  const containerPhotos = element.querySelector('.popup__photos');
  const popupTitle = element.querySelector('.popup__title');
  const popupAddress = element.querySelector('.popup__text--address');
  const popupPrice = element.querySelector('.popup__text--price');
  const popupType = element.querySelector('.popup__type');
  const popupCapacity = element.querySelector('.popup__text--capacity');
  const popupTime = element.querySelector('.popup__text--time');
  const popupFeatures = element.querySelector('.popup__features');
  const popupFeaturesItems = popupFeatures.querySelectorAll('.popup__feature');
  const popupDescription = element.querySelector('.popup__description');
  const popupPhotos = element.querySelector('.popup__photos');
  const popupAvatar = element.querySelector('.popup__avatar');
  if (offer.title === undefined) {
    addClassOrRemoveClass(popupTitle, 'add', 'hidden');
  } else {
    popupTitle.textContent = offer.title;
  }
  if (offer.address === undefined) {
    addClassOrRemoveClass(popupAddress, 'add', 'hidden');
  } else {
    popupAddress.textContent = offer.address;
  }
  if (offer.price === undefined) {
    addClassOrRemoveClass(popupPrice, 'add', 'hidden');
  } else {
    popupPrice.textContent = `${offer.price} ₽/ночь`;
  }
  for (const item in TypeTranslate) {
    if (item.toLowerCase() === offer.type) {
      offer.type = TypeTranslate[item];
    }
  }
  if (offer.type === undefined) {
    addClassOrRemoveClass(popupType, 'add', 'hidden');
  } else {
    popupType.textContent = offer.type;
  }
  if (offer.rooms === undefined || offer.guests === undefined) {
    addClassOrRemoveClass(popupCapacity, 'add', 'hidden');
  } else {
    popupCapacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  }
  if (offer.checkin === undefined || offer.checkout === undefined) {
    addClassOrRemoveClass(popupTime, 'add', 'hidden');
  } else {
    popupTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  }
  if (offer.features === undefined) {
    addClassOrRemoveClass(popupFeatures, 'add', 'hidden');
  } else {
    popupFeaturesItems.forEach((item) => {
      addClassOrRemoveClass(item, 'add', 'hidden');
    });
    offer.features.forEach((itemData) => {
      popupFeaturesItems.forEach((itemElement) => {
        if(itemElement.className.indexOf(itemData) !== -1) {
          addClassOrRemoveClass(itemElement, 'remove', 'hidden');
        }
      });
    });
  }
  if (offer.description === undefined) {
    addClassOrRemoveClass(popupDescription, 'add', 'hidden');
  } else {
    popupDescription.textContent = offer.description;
  }
  if (offer.photos === undefined) {
    addClassOrRemoveClass(popupPhotos, 'add', 'hidden');
  } else {
    offer.photos.forEach((photo) => {
      const photoItem = templatePhoto.cloneNode(true);
      photoItem.src = photo;
      containerPhotos.innerHTML = '';
      containerPhotos.appendChild(photoItem);
    });
  }
  if (author.avatar === undefined) {
    addClassOrRemoveClass(popupAvatar, 'add', 'hidden');
  } else {
    popupAvatar.src = author.avatar;
  }
  return element;
};

export {appendData};
