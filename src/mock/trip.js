import { getRandomArrayElement, getRandomInt } from '../utils/common.js';
import { TRIP_EVENT_TYPES, DESCRIPTIONS, DESTINATION_NAMES } from '../const.js';
import dayjs from 'dayjs';

const generateRandomEventType = () => getRandomArrayElement(TRIP_EVENT_TYPES);

const generateDescription = () => getRandomArrayElement(DESCRIPTIONS);

const generatePhotos = () => {
  const picturesNumber = getRandomInt(1, 5);

  const pictures = new Array(picturesNumber);
  for (let i = 0; i < pictures.length; ++i) {
    pictures[i] = {
      src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGljfGVufDB8fDB8fHww&w=1000&q=80', //сервис с картинками не работает :(
      description: generateDescription(),
    };
  }
  return pictures;
};

export const destinations = {};
DESTINATION_NAMES.forEach((name, index) => {
  const id = index + 1;
  destinations[`${id}`] = {
    id,
    description: generateDescription(),
    name,
    pictures: generatePhotos(),
  };
});
const getRandomDestination = () => destinations[`${getRandomInt(1, DESTINATION_NAMES.length)}`];

const generateDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInt(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, 'day').toDate();
};

const numOfOffers = getRandomInt(1, 8);
export const allOffers = new Array(numOfOffers);
for (let i = 0; i < numOfOffers; i++) {
  allOffers[i] = {
    id: i,
    title: getRandomArrayElement(DESTINATION_NAMES),
    price: getRandomInt(1, 500)
  };
}

const generateOffers = () => {
  const res = new Set();
  for (let i = 0; i < numOfOffers; i++) {
    if (getRandomInt() > 50) {
      res.add(i);
    }
  }
  return Array.from(res);
};


const generateTripEvents = (eventsNumber) => {
  const events = new Array(eventsNumber);
  for (let i = 0; i < eventsNumber; ++i) {

    const dateFrom = generateDate();
    const dateTo = generateDate();

    const type = generateRandomEventType();
    events[i] = {
      id: i + 1,
      type,
      dateFrom,
      dateTo,
      basePrice: getRandomInt(1, 10000),
      offers: generateOffers(),
      destination: getRandomDestination(),
    };
  }
  return events;
};

export { generateTripEvents };
