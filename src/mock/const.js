import {getRandomInteger, getRandomArrayElement } from '../utils/common-utils';

const TRIP_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];
const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis. ',
];
const DESTINATIONS = [
  {
    id:1,
    name:'Chamonix',
    description: 'Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, its renowned for its skiing.' ,
    pictures:[
      {src: `http://picsum.photos/248/152?r=${getRandomInteger(1, 10)}`,
        description:getRandomArrayElement(DESCRIPTIONS)},
      {src: `http://picsum.photos/248/152?r=${getRandomInteger(1, 10)}`,
        description:getRandomArrayElement(DESCRIPTIONS)},
      {src: `http://picsum.photos/248/152?r=${getRandomInteger(1, 10)}`,
        description:getRandomArrayElement(DESCRIPTIONS)}
    ]
  },
  {
    id:2,
    name:'Amsterdam',
    description: 'Amsterdam, with crowded streets, middle-eastern paradise, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction.',
    pictures:[
      {src: `http://picsum.photos/248/152?r=${getRandomInteger(1, 10)}`,
        description:getRandomArrayElement(DESCRIPTIONS)},
      {src: `http://picsum.photos/248/152?r=${getRandomInteger(1, 10)}`,
        description:getRandomArrayElement(DESCRIPTIONS)},
      {src: `http://picsum.photos/248/152?r=${getRandomInteger(1, 10)}`,
        description:getRandomArrayElement(DESCRIPTIONS)}
    ]
  },
  {
    id:3,
    name:'Geneva',
    description: 'Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.',
    pictures:[
      {src: `http://picsum.photos/248/152?r=${getRandomInteger(1, 10)}`,
        description:getRandomArrayElement(DESCRIPTIONS)},
      {src: `http://picsum.photos/248/152?r=${getRandomInteger(1, 10)}`,
        description:getRandomArrayElement(DESCRIPTIONS)},
      {src: `http://picsum.photos/248/152?r=${getRandomInteger(1, 10)}`,
        description:getRandomArrayElement(DESCRIPTIONS)}
    ]
  }
];
const OFFERS = [
  {type: 'taxi',
    offers: [
      {
        id:1,
        title:'Upgrade to a business class',
        price:40,
      },
      {
        id:2,
        title:'Choice music',
        price:20,
      },
    ]
  },
  {type: 'bus',
    offers: [
      {
        id:1,
        title:'Add comfort place',
        price:30,
      },
      {
        id:2,
        title:'Add luggage',
        price:50,
      },
    ]
  },
  {type: 'train',
    offers: [
      {
        id:1,
        title:'Add comfort place',
        price:70,
      },
      {
        id:2,
        title:'Add luggage',
        price:30,
      },
      {
        id:3,
        title:'Add meal',
        price:60,
      },

    ]
  },
  {type: 'ship',
    offers: [
      {
        id:1,
        title:'Add comfort place',
        price:120,
      },
      {
        id:2,
        title:'Upgrade to a business class',
        price:160,
      },
    ]
  },
  {type: 'drive',
    offers: [
      {
        id:1,
        title:'Choice music',
        price:10,
      },
      {
        id:2,
        title:'Switch to comfort',
        price:40,
      },
      {
        id:3,
        title:'Add comfort place',
        price:20,
      },
    ]
  },
  {type: 'flight',
    offers: [
      {
        id:1,
        title:'Add comfort place',
        price:50,
      },
      {
        id:2,
        title:'Add luggage',
        price:50,
      },
      {
        id:3,
        title:'Add meal',
        price:70,
      },
    ]
  },
  {type: 'check-in',
    offers: [
      {
        id:1,
        title:'Add meal',
        price:100,
      },
      {
        id:2,
        title:'Travel by train',
        price:220,
      },
      {
        id:3,
        title:'Switch to comfort',
        price:150,
      },
    ]
  },
  {type: 'sightseeing',
    offers: [
      {
        id:1,
        title:'Travel by train',
        price:140,
      },
    ]
  },
  {type: 'restaurant',
    offers: [
      {
        id:1,
        title:'Switch to comfort',
        price:80,
      },
      {
        id:2,
        title:'Upgrade to a business class',
        price:100,
      },
      {
        id:3,
        title:'Add comfort place',
        price:100,
      },
    ]
  },
];

const SortType = {
  DAY: 'day',
  PRICE: 'price'
};

export {TRIP_TYPES,DESTINATIONS,OFFERS,SortType};
