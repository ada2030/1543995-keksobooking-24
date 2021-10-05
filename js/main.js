const getRandomNumber = (from, to) => {
  if (from <=0 || to <= 0) {
    throw new Error('Диапазон должен быть выше нуля');
  }
  if (from >= to) {
    throw new Error('Минимальное число должно быть меньше чем максимальное');
  }
  return Math.floor(Math.random() * (to - from + 1)) + from;
};

getRandomNumber(4, 5);

const getRandomFloatingPointNumber = (from, to, floatNumber) => {
  if (from < 0 || to < 0) {
    throw new Error('Диапазон должен быть выше нуля');
  }
  if (from >= to) {
    throw new Error('Минимальное число должно быть меньше чем максимальное');
  }
  return Math.random() * (to - from + 1) + from.toFixed(floatNumber);
};

getRandomFloatingPointNumber(4, 5, 2);
