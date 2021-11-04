
const getFilterRank = (data) => {
  const formFilters = document.querySelector('.map__filters');
  const typeFilter = formFilters.querySelector('.housing__type');
  const priceFilter = formFilters.querySelector('.housing__price');
  const roomsFilter = formFilters.querySelector('.housing__rooms');
  const guestsFilter = formFilters.querySelector('.housing__guests');

  let rank = 0;

  if (data.offer.type === typeFilter.value) {
    rank++;
  }
  let priceText;
  if (data.offer.price < 10000) {
    priceText = 'low';
  } else if (data.offer.price > 10000 && data.offer.price < 50000) {
    priceText = 'middle';
  } else if (data.offer.price > 50000) {
    priceText = 'high';
  }
  if (priceText === priceFilter.value) {
    rank++;
  }
  if (data.offer.rooms === roomsFilter.value) {
    rank++;
  }
  if (data.offer.guests === guestsFilter.value) {
    rank++;
  }

  return rank;
};

const compareData = (dataA, dataB) => {
  const rankA = getFilterRank(dataA);
  const rankB = getFilterRank(dataB);

  return rankB - rankA;
};
export {getFilterRank, compareData};
