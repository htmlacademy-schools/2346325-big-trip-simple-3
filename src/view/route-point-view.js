import AbstractView from '../framework/view/abstract-view.js';
import { humanizePointDate } from '../utils/point-utils.js';

const createOffersTemplate = (offersByType, type, offers) => {
  const offersByCurrentType = offersByType.find((element) => element.type === type).offers;
  const offersById = offersByCurrentType.filter((element) => offers.includes(element.id));

  return offersById.map((offer) => {
    const { title, price } = offer;
    return (
      `<li class="event__offer">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </li>`
    );
  }).join('');
};

const createPointRouteTemplate = (pointRoute,destinations,offersByType) => {
  const {basePrice,dateFrom,dateTo,destination,type,offers} = pointRoute;
  const destinationName = destinations.find((element) => element.id === destination).name;

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${humanizePointDate(dateFrom, 'YYYY-MM-DD')}">${humanizePointDate(dateFrom, 'MMM DD')}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destinationName}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${humanizePointDate(dateFrom, 'YYYY-MM-DDTHH:mm')}">${humanizePointDate(dateFrom, 'H:mm')}</time>
            &mdash;
            <time class="event__end-time" datetime="${humanizePointDate(dateTo, 'YYYY-MM-DDTHH:mm')}">${humanizePointDate(dateTo, 'H:mm')}</time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createOffersTemplate(offersByType, type, offers)}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class PointRouteView extends AbstractView {

  #pointRoute = null;
  #destinations = null;
  #offersByType = null;

  constructor (pointRoute,destinations,offers) {
    super();
    this.#pointRoute = pointRoute;
    this.#destinations = destinations;
    this.#offersByType = offers;
  }

  get template() {
    return createPointRouteTemplate(this.#pointRoute,this.#destinations,this.#offersByType);
  }

  setFormOpen = (callback) => {
    this._callback.formOpen = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formOpenHandler);
  };

  #formOpenHandler = (evt) => {
    evt.preventDefault();
    this._callback.formOpen();
  };
}
