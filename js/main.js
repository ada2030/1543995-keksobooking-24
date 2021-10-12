import {getRandomPositiveInteger, getRandomArrayElement, getArray} from './util.js';
import {SIMILAR_COUNT, TITLE, TYPE, FEATURES, CHECKIN_CHECKOUT, PHOTOS, getLocation} from './data.js';

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
