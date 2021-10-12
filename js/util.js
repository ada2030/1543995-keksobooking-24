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

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length)];

const getArray = (elements) => {
  const randomArray = [];
  for (let i = 0; i < getRandomPositiveInteger(1, 6); i++) {
    randomArray[i] = elements[i];
  }
  return randomArray;
};

export {getRandomPositiveFloat, getRandomPositiveInteger, getRandomArrayElement, getArray};
