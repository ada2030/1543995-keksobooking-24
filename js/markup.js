const template = document.querySelector('#card').content.querySelector('.popup');
const templatePhoto = document.querySelector('#card').content.querySelector('.popup__photo');

// функция ставки данных в шаблон
const appendData = (data) => {
  const element = template.cloneNode(true);
  const containerPhotos = element.querySelector('.popup__photos');
  containerPhotos.innerHTML = '';
  if (data.offer.title === undefined) {
    element.querySelector('.popup__title').classList.add('hidden');
  } else {
    element.querySelector('.popup__title').textContent = data.offer.title;
  }
  if (data.offer.address === undefined) {
    element.querySelector('.popup__text--address').classList.add('hidden');
  } else {
    element.querySelector('.popup__text--address').textContent = data.offer.address;
  }
  if (data.offer.price === undefined) {
    element.querySelector('.popup__text--price').classList.add('hidden');
  } else {
    element.querySelector('.popup__text--price').textContent = `${data.offer.price} ₽/ночь`;
  }
  if (data.offer.type === 'palace') {
    data.offer.type = 'Дворец';
  } else if (data.offer.type === 'flat') {
    data.offer.type = 'Квартира';
  } else if (data.offer.type === 'bungalow') {
    data.offer.type = 'Бунгало';
  } else if (data.offer.type === 'house') {
    data.offer.type = 'Дом';
  } else if (data.offer.type === 'hotel') {
    data.offer.type = 'Отель';
  }
  if (data.offer.type === undefined) {
    element.querySelector('.popup__type').classList.add('hidden');
  } else {
    element.querySelector('.popup__type').textContent = data.offer.type;
  }
  if (data.offer.rooms === undefined || data.offer.guests === undefined) {
    element.querySelector('.popup__text--capacity').classList.add('hidden');
  } else {
    element.querySelector('.popup__text--capacity').textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;
  }
  if (data.offer.checkin === undefined || data.offer.checkout === undefined) {
    element.querySelector('.popup__text--time').classList.add('hidden');
  } else {
    element.querySelector('.popup__text--time').textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;
  }
  if (data.offer.features === undefined) {
    element.querySelector('.popup__features').classList.add('hidden');
  } else {
    element.querySelector('.popup__features').textContent = data.offer.features;
  }
  if (data.offer.description === undefined) {
    element.querySelector('.popup__description').classList.add('hidden');
  } else {
    element.querySelector('.popup__description').textContent = data.offer.description;
  }
  if (data.offer.photos === undefined) {
    element.querySelector('.popup__photos').classList.add('hidden');
  } else {
    data.offer.photos.forEach((photo) => {
      const photoItem = templatePhoto.cloneNode(true);
      photoItem.src = photo;
      containerPhotos.appendChild(photoItem);
    });
  }
  if (data.author.avatar === undefined) {
    element.querySelector('.popup__avatar').classList.add('hidden');
  } else {
    element.querySelector('.popup__avatar').src = data.author.avatar;
  }
  return element;
};

export {appendData};
