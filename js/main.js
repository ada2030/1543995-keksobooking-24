function getRandomPositiveFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(digits);
}

function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

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

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length)];

const getFeatures = () => {
  const randomFeatures = [];
  for (let i = 0; i < getRandomPositiveInteger(1, FEATURES.length); i++) {
    randomFeatures[i] = FEATURES[i];
  }
  return randomFeatures;
};

const getPhotos = () => {
  const randomPhotos = [];
  for (let i = 0; i < getRandomPositiveInteger(1, 10); i++) {
    randomPhotos[i] = PHOTOS[getRandomPositiveInteger(0, 2)];
  }
  return randomPhotos;
};

const getLocation = () => {
  const location = {
    lat: getRandomPositiveFloat(35.65000, 35.70000, 5),
    lng: getRandomPositiveFloat(139.70000, 139.80000, 5),
  };
  return location;
};

const getObjects = (i) => {
  const getAvatar = () => {
    const IMG_NAME = 'img/avatars/user';
    const FORMAT = '.png';
    const ZERO = '0';
    const number = i + 1;
    if (number === 10) {
      return IMG_NAME + number + FORMAT;
    }
    return IMG_NAME + ZERO + number + FORMAT;
  };

  const {lat, lng} = getLocation();

  return {
    author: {
      avatar: getAvatar(),
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
      features: getFeatures(),
      description: 'Очень просторное помещение',
      photos: getPhotos(),
    },
    location: {
      lat,
      lng,
    },
  };
};

const mainArray = Array.from({length: SIMILAR_COUNT}, (item, idx) => getObjects(idx)); /* eslint-disable-line */
