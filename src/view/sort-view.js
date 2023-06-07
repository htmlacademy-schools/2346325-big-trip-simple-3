import AbstractView from '../framework/view/abstract-view.js';

const createSortTemplate = (sortValues) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortValues.length > 0 ? sortValues.map((sort) => (
    `<div class="trip-sort__item  trip-sort__item--${sort.name}">
      <input id="sort-${sort.name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sort.name}">
      <label class="trip-sort__btn" for="sort-${sort.name}">${sort.name}</label>
      </div>
      `)).join('') : ''
  }
  </form>`
);

export default class SortView extends AbstractView {
  #sortValues = null;

  constructor(sortValues) {
    super();
    this.#sortValues = sortValues;
  }

  get template() {
    return createSortTemplate(this.#sortValues);
  }
}
