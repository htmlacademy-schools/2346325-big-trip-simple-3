import { getRandomArrayElement,getRandomInteger,getRandomElementsFromArray } from '../utils/common-utils';
import {TRIP_TYPES,DESTINATIONS,OFFERS} from './const';
import {nanoid} from 'nanoid';
const getArrayId = (type) => {
  const offersByType = OFFERS.find((element) => element.type === type ).offers;
  return offersByType.map((element) => element.id);
};

export const generatePointRoute = () => {
  const typePointRoute = getRandomArrayElement(TRIP_TYPES);
  const offersPoint = getArrayId(typePointRoute);

  return ({
    id:nanoid(),
    basePrice:getRandomInteger(200,500),
    dateFrom:'2019-07-10T22:55:56.845Z',
    dateTo:'2019-07-11T11:22:13.375Z',
    destination:getRandomArrayElement(DESTINATIONS).id,
    type:typePointRoute,
    offersAll:getRandomElementsFromArray(offersPoint,getRandomInteger(1,offersPoint.length))
  });
};

