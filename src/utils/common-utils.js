const getRandomInteger = function (a = 0, b = 1) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayElement = function (targetArray) {
  return targetArray[getRandomInteger(0, targetArray.length - 1)];
};

const getRandomElementsFromArray = (targetArray,count) => targetArray.slice().sort(() => Math.random() - 0.5).slice(0, count);

const generateAuthorizationKey = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};


export {getRandomInteger, getRandomArrayElement,getRandomElementsFromArray, generateAuthorizationKey};
