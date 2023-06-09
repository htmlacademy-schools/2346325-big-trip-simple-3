const SortType = {
  DAY: 'day',
  PRICE: 'price'
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_EVENT',
  ADD_POINT: 'ADD_EVENT',
  DELETE_POINT: 'DELETE_EVENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future'
};

export {SortType,UserAction, UpdateType,FilterType};
