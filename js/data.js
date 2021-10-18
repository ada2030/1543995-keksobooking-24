import {getRandomPositiveFloat, getRandomPositiveInteger, getRandomArrayElement, getArray} from './utils.js';

const SIMILAR_COUNT = 10;

const TITLE = [
  'Предлагается стильная двухкомнатная квартира',
  'Квартира с просторной планировкой',
  'Уникальные апартаменты с панорамными видами',
  'Без комиссии для арендатора.',
  'Функциональные апартаменты с панорамным остеклением',
  'Квартира с современным дизайнерским ремонтом',
  'Апартаменты в Москва Сити с потрясающими видами',
  'Функциональные апартаменты с дизайнерской отделкой, уютным интерьером',
  'Искали самый козырный апартамент в Неве?',
  'Угловой Апартамент в Москва Сити',
];

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow.',
  'hotel',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const CHECKIN_CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getLocation = () => {
  const location = {
    lat: getRandomPositiveFloat(35.65000, 35.70000, 5),
    lng: getRandomPositiveFloat(139.70000, 139.80000, 5),
  };
  return location;
};

const getObjects = (i) => {
  i++;
  const ZERO = '0';
  const avatar = `img/avatars/user${(i === 10 ? i : ZERO + i)}.png`;

  const {lat, lng} = getLocation();

  return {
    author: {
      avatar: avatar,
    },
    offer: {
      title: getRandomArrayElement(TITLE),
      address: `${lat}, ${lng}`,
      price: getRandomPositiveInteger(100000, 200000),
      type: getRandomArrayElement(TYPE),
      rooms: getRandomPositiveInteger(1, 10),
      guests: getRandomPositiveInteger(1, 10),
      checkin: getRandomArrayElement(CHECKIN_CHECKOUT),
      checkout: getRandomArrayElement(CHECKIN_CHECKOUT),
      features: getArray(FEATURES),
      description: 'Очень просторное помещение',
      photos: getArray(PHOTOS),
    },
    location: {
      lat,
      lng,
    },
  };
};

const mainArray = Array.from({length: SIMILAR_COUNT}, (item, idx) => getObjects(idx)); /* eslint-disable-line */

export {mainArray};
