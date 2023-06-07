import {
  humanizePointDate,
  humanizePointTime,
  humanizePointDateNumber,
  getPointDateRFC
} from '../utils/common.js';
import AbstractView from '../framework/view/abstract-view.js';

const createEventViewTemplate = (point) => {
  const {dateFrom, dateTo, basePrice, type, destination, offers} = point;

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${humanizePointDateNumber(dateFrom)}">${dateFrom ? humanizePointDate(dateFrom) : ''}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${getPointDateRFC(dateFrom)}">${dateFrom ? humanizePointTime(dateFrom) : ''}</time>
            &mdash;
            <time class="event__end-time" datetime="${getPointDateRFC(dateTo)}">${dateTo ? humanizePointTime(dateTo) : ''}</time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
        ${offers.length > 0 ? offers.map((offer) => (`<div class="event__offer-selector">
                  <li class="event__offer">
                    <span class="event__offer-title">${offer.title}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${offer.price}</span>
                  </li>
                `)).join('') : ''
    }
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class PointView extends AbstractView {
  #event = null;

  constructor(event) {
    super();
    this.#event = event;
  }

  get template() {
    return createEventViewTemplate(this.#event);
  }

  setEditButtonClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
