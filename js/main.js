const getRandomNumber = function (from, to) {
  if (from <=0 || to <= 0) {
    console.log('Диапазон должен быть выше нуля');
    return;
  }
  if (from >= to) {
    console.log('Минимальное число должно быть меньше чем максимальное');
    return;
  }
  return Math.floor(Math.random() * (to - from + 1)) + from;
}

console.log(getRandomNumber(4, 5));

const getRandomCoordinates = function (from, to, floatNumber) {
  if (from < 0 || to < 0) {
    console.log('Диапазон должен быть выше нуля');
    return;
  }
  if (from >= to) {
    console.log('Минимальное число должно быть меньше чем максимальное');
    return;
  }
  let result = Math.random() * (to - from + 1) + from;
  return result.toFixed(floatNumber);
}

console.log(getRandomCoordinates(4, 5, 2));
