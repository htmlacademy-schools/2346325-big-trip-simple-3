import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

const createSortTemplate = (currentSortType) => `
<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
<div class="trip-sort__item  trip-sort__item--${SortType.DAY}">
<input id="sort-${SortType.DAY}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.DAY}" data-sort-type="${SortType.DAY}" ${currentSortType === SortType.DAY ? 'checked' : ''}>
<label class="trip-sort__btn" for="sort-${SortType.DAY}" >${SortType.DAY}</label>
</div>

<div class="trip-sort__item  trip-sort__item--event">
  <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
  <label class="trip-sort__btn" for="sort-event">Event</label>
</div>

<div class="trip-sort__item  trip-sort__item--time">
  <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" disabled>
  <label class="trip-sort__btn" for="sort-time">Time</label>
</div>

<div class="trip-sort__item  trip-sort__item--${SortType.PRICE}">
<input id="sort-${SortType.PRICE}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.PRICE}" data-sort-type="${SortType.PRICE}" ${currentSortType === SortType.PRICE ? 'checked' : ''}>
<label class="trip-sort__btn" for="sort-${SortType.PRICE}">${SortType.PRICE}</label>
</div>

<div class="trip-sort__item  trip-sort__item--offer">
  <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
  <label class="trip-sort__btn" for="sort-offer">Offers</label>
</div>
</form>
`;

export default class SortView extends AbstractView {
  #currentSortType = SortType.DAY;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click' , this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if(evt.target.tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    this.#currentSortType = evt.target.dataset.sortType;
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
