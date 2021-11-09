const formFilters = document.querySelector('.map__filters');
const allFilters = formFilters.querySelectorAll('.map__filter');
const featuresFilter = formFilters.querySelector('.map__features');
const allCheckboxes = featuresFilter.querySelectorAll('input');

const getFilterRank = (data) => {
  const typeFilter = formFilters.querySelector('[name="housing-type"]');
  const priceFilter = formFilters.querySelector('[name="housing-price"]');
  const roomsFilter = formFilters.querySelector('[name="housing-rooms"]');
  const guestsFilter = formFilters.querySelector('[name="housing-guests"]');
  const featuresItems = featuresFilter.querySelectorAll('input:checked');
  const PriceRange = {
    LOW: {
      MIN: 0,
      MAX: 10000,
    },
    MIDDLE: {
      MIN: 10000,
      MAX: 50000,
    },
    HIGH: {
      MIN: 50000,
      MAX: Infinity,
    },
  };
  let rank = 0;
  if (data.offer.type === typeFilter.value) {
    rank++;
  }
  let priceText;
  for (const item in PriceRange) {
    if (data.offer.price > PriceRange[item].MIN && data.offer.price < PriceRange[item].MAX) {
      priceText = item.toLowerCase();
    }
  }
  if (priceText === priceFilter.value) {
    rank++;
  }
  if (data.offer.rooms === Number(roomsFilter.value)) {
    rank++;
  }
  if (data.offer.guests === Number(guestsFilter.value)) {
    rank++;
  }
  for (const featureData in data.offer.features) {
    featuresItems.forEach((item) => {
      if (data.offer.features[featureData] === item.value) {
        rank += 0.5;
      }
    });
  }
  return rank;
};

const compareData = (dataA, dataB) => {
  const rankA = getFilterRank(dataA);
  const rankB = getFilterRank(dataB);
  return rankB - rankA;
};

const changeFilters = (cb) => {
  allFilters.forEach((item) => {
    item.addEventListener('change', () => {
      cb();
    });
  });
  allCheckboxes.forEach((item) => {
    item.addEventListener('change', () => {
      cb();
    });
  });
};

export {compareData, changeFilters};
