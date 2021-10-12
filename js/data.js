import {getRandomPositiveFloat} from './util.js';

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

export {SIMILAR_COUNT, TITLE, TYPE, FEATURES, CHECKIN_CHECKOUT, PHOTOS, getLocation};
