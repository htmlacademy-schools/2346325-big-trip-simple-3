import {FILTER_TYPES} from '../const';

export const filter = {
  [FILTER_TYPES.EVERYTHING]: (points) => points.filter((point) => !point.isFuture),
  [FILTER_TYPES.FUTURE]: (points) => points.filter((point) => point.isFuture)
};

