import { SORT_TYPE } from '../const.js';

export const sort = {
  [SORT_TYPE.DAY]: (points) => points,
  [SORT_TYPE.EVENT]: (points) => points,
  [SORT_TYPE.TIME]: (points) => points,
  [SORT_TYPE.PRICE]: (points) => points,
  [SORT_TYPE.OFFERS]: (points) => points,
};
