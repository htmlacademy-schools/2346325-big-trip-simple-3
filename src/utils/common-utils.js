// Функция, возвращающая случайное целое число из переданного диапазона
const getRandomInteger = function (a = 0, b = 1) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayElement = function (targetArray) {
  return targetArray[getRandomInteger(0, targetArray.length - 1)];
};

const getRandomElementsFromArray = (targetArray,count) => targetArray.slice().sort(() => Math.random() - 0.5).slice(0, count);

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }
  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};
export {getRandomInteger,updateItem, getRandomArrayElement,getRandomElementsFromArray};
