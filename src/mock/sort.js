import { sort } from '../utils/sort.js';

export const generateSort = (trips) => Object.entries(sort).map(
  ([sortName, sortTrips]) => ({
    name: sortName,
    count: sortTrips(trips).length,
  }),
);
