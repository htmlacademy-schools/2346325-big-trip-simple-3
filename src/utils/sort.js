import { SORT_TYPE } from '../const.js';
import dayjs from 'dayjs';

export const sort = {
  [SORT_TYPE.DAY]: (points) => points,
  [SORT_TYPE.EVENT]: (points) => points,
  [SORT_TYPE.TIME]: (points) => points,
  [SORT_TYPE.PRICE]: (points) => points,
  [SORT_TYPE.OFFERS]: (points) => points,
};

export const sortPointsByDay = (a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom));
export const sortPointsByPrice = (a, b) => b.basePrice - a.basePrice;
