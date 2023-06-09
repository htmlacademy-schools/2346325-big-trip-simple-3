import { getRandomArrayElement,getRandomInteger,getRandomElementsFromArray } from '../utils/common-utils.js';
import {TRIP_TYPES,getOffersByType,getDestinations} from './const.js';
import {nanoid} from 'nanoid';

const destinations = getDestinations();
const offersByType = getOffersByType();

const getOffersByTargetType = (targetType) => offersByType.find((element) => element.type === targetType).offers;
const getOffersId = (offers) => offers.map((offer) => offer.id);

const generatePoint = () => {
  const pointType = getRandomArrayElement(TRIP_TYPES);
  const offersId = getOffersId(getOffersByTargetType(pointType));

  return ({
    id:nanoid(),
    basePrice:getRandomInteger(200,500),
    dateFrom:`2019-0${getRandomInteger(1, 7)}-0${getRandomInteger(1, 9)}T22:55:56.845Z`,
    dateTo:`2019-0${getRandomInteger(7, 9)}-11T11:22:13.375Z`,
    destination:getRandomArrayElement(destinations).id,
    type:pointType,
    offers:getRandomElementsFromArray(offersId,getRandomInteger(1,offersId.length))
  });
};

export { destinations, offersByType, generatePoint };
