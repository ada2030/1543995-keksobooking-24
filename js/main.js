const SIMILAR_COUNT = 10;

const getAuthor = () => {
  const IMG_NAME = 'img/avatars/user';
  const FORMAT = '.png';
  const ZERO = '0';
  const NUMBER = Math.floor(Math.random() * (10 - 1 + 1) + 1);
  if (NUMBER === 10) {
    return {
      avatar: IMG_NAME + NUMBER + FORMAT,
    };
  }
  return {
    avatar: IMG_NAME + ZERO + NUMBER + FORMAT,
  };
};

const getLocation = () => {
  return {
    lat: (Math.random() * (35.70000 - 35.65000 + 1) + 35.65000).toFixed(5),
    lng: (Math.random() * (139.80000 - 139.70000 + 1) + 139.70000).toFixed(5),
  };
};

const getOffer = () => {
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
  const CHECKIN_CHECKOUT = [
    '12:00',
    '13:00',
    '14:00',
  ];
  const DESCRIPTION = [
    'Встроенная кухня - 10 кв.м. (посудомоечная машина, микроволновая, вытяжка, чайник, набор посуды)',
    'Квартира полностью меблированная, в каждой комнате встроенный шкаф',
    'Дом новый, хороший подъезд, домофон, 2 лифта',
    'В квартире выполнен качественный ремонт, на стенах светлые обои, пол ламинат, высокие потолки',
  ];
  const getFeatures = () => {
    const FEATURES = [
      'wifi',
      'dishwasher',
      'parking',
      'washer',
      'elevator',
      'conditioner',
    ];
    const RANDOM_FEATURES = [];
    for (let i = 0; i < Math.floor(Math.random() * (FEATURES.length - 1 + 1) + 1); i++) {
      RANDOM_FEATURES[i] = FEATURES[i];
    }
    return RANDOM_FEATURES;
  };
  const getPhotos = () => {
    const PHOTOS = [
      'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
      'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
      'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
    ];
    const RANDOM_PHOTOS = [];
    for (let i = 0; i < Math.floor(Math.random() * (10 - 1 + 1) + 1); i++) {
      RANDOM_PHOTOS[i] = PHOTOS[Math.floor(Math.random() * (2 - 0 + 1) + 0)];
    }
    return RANDOM_PHOTOS;
  };
  const getRandomArrayElement = (elements) => {
    return elements[Math.floor(Math.random() * (0 - elements.length + 1)) + elements.length];
  };
  return {
    title: getRandomArrayElement(TITLE),
    address: getLocation(),
    price: Math.floor(Math.random() * (100000 - 1 + 1) + 1),
    type: getRandomArrayElement(TYPE),
    rooms: Math.floor(Math.random() * (10 - 1 + 1) + 1),
    quests: Math.floor(Math.random() * (10 - 1 + 1) + 1),
    checkin: getRandomArrayElement(CHECKIN_CHECKOUT),
    checkout: getRandomArrayElement(CHECKIN_CHECKOUT),
    features: getFeatures(),
    description: getRandomArrayElement(DESCRIPTION),
    photos: getPhotos(),
  };
};

const mainArray = () => {
  return Array.from({length: 1}, getAuthor).concat(Array.from({length: 1}, getOffer).concat(Array.from({length: 1}, getLocation)));
};

const SIMILAR_ANNOUNCEMENT = Array.from({length: SIMILAR_COUNT}, mainArray);
SIMILAR_ANNOUNCEMENT();
