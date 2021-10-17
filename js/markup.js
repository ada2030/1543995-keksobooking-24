import {mainArray} from './data.js';

const randomData = mainArray;
const container = document.querySelector('.map__canvas');
const template = document.querySelector('#card').content.querySelector('.popup');
const templatePhoto = document.querySelector('#card').content.querySelector('.popup__photo');
for (let i = 0; i < 1; i++) {
  const element = template.cloneNode(true);
  const containerPhotos = element.querySelector('.popup__photos');
  containerPhotos.innerHTML = '';
  element.querySelector('.popup__title').textContent = randomData[i].offer.title;
  element.querySelector('.popup__text--address').textContent = randomData[i].offer.address;
  element.querySelector('.popup__text--price').textContent = `${randomData[i].offer.price} ₽/ночь`;
  if (randomData[i].offer.type === 'palace') {
    randomData[i].offer.type = 'Дворец';
  } else if (randomData[i].offer.type === 'flat') {
    randomData[i].offer.type = 'Квартира';
  } else if (randomData[i].offer.type === 'bungalow') {
    randomData[i].offer.type = 'Бунгало';
  } else if (randomData[i].offer.type === 'house') {
    randomData[i].offer.type = 'Дом';
  } else if (randomData[i].offer.type === 'hotel') {
    randomData[i].offer.type = 'Отель';
  }
  element.querySelector('.popup__type').textContent = randomData[i].offer.type;
  element.querySelector('.popup__text--capacity').textContent = `${randomData[i].offer.rooms} комнаты для ${randomData[i].offer.guests} гостей`;
  element.querySelector('.popup__text--time').textContent = `Заезд после ${randomData[i].offer.checkin}, выезд до ${randomData[i].offer.checkout}`;
  element.querySelector('.popup__features').textContent = randomData[i].offer.features;
  element.querySelector('.popup__description').textContent = randomData[i].offer.description;
  randomData[i].offer.photos.forEach((photo) => {
    const photoItem = templatePhoto.cloneNode(true);
    photoItem.src = photo;
    containerPhotos.appendChild(photoItem);
  });
  element.querySelector('.popup__avatar').src = randomData[i].author.avatar;
  container.appendChild(element);
}

