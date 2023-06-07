import dayjs from 'dayjs';

const getRandomInt = (min, max) => {
  if (max < min) {
    throw Error('Incorrect range');
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomArrayElement = (array) => {
  const index = getRandomInt(0, array.length - 1);
  return array[index];
};

const humanizePointDate = (date) => dayjs(date).format('MMM D');

const humanizePointTime = (date) => dayjs(date).format('hh:mm');

const humanizePointDateNumber = (dueDate) => dayjs(dueDate).format('YYYY-MM-DD');

const getPointDateRFC = (dueDate) => dayjs(dueDate).format('YYYY-MM-DDTHH:mm');

const createOnEscKeydownFun = (element, onKeydownFunction) => {
  const onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      onKeydownFunction();
    }
  };
  element.addEventListener('keydown', onEscKeydown);

  return onEscKeydown;
};

export { getRandomInt, getRandomArrayElement, humanizePointDate, humanizePointTime, humanizePointDateNumber, getPointDateRFC, createOnEscKeydownFun };
