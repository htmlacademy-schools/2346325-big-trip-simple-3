import AbstractView from '../framework/view/abstract-view.js';
import { humanizePointDate } from '../utils/point-utils.js';

const createOffersTemplate = (offers) => {
  const offerTemplate = offers.map(({id,title,price}) =>
    `<li class="event__offer" id='${id}'>
  <span class="event__offer-title">${title}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${price}</span>
   </li>`
  );
  return offerTemplate.join('');

};

const createPointRouteTemplate = (pointRoute,destinations,offers) => {
  const {basePrice,dateFrom,dateTo,destination,type} = pointRoute;

  const offersByType = offers.find((element) => element.type === type);
  const offersSelect = offersByType.offers.filter((element) => pointRoute.offersAll.includes(element.id));

  const destinationName = destinations.find((element) => element.id === destination).name;

  const dateMarkup = humanizePointDate(dateFrom, 'YYYY-MM-DD');
  const dateDisplay = humanizePointDate(dateFrom, 'MMM D');
  const dateTimeMarkupFrom = humanizePointDate(dateFrom, 'YYYY-MM-DDTHH:mm');
  const dateTimeDisplayFrom = humanizePointDate(dateFrom, 'H:mm');
  const dateTimeMarkupTo = humanizePointDate(dateTo, 'YYYY-MM-DDTHH:mm');
  const dateTimeDisplayTo = humanizePointDate(dateTo, 'H:mm');
  return (
    `
<div class="event">
<time class="event__date" datetime=${dateMarkup}>${dateDisplay}</time>
<div class="event__type">
  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
</div>
<h3 class="event__title">${type} ${destinationName}</h3>
<div class="event__schedule">
  <p class="event__time">
    <time class="event__start-time" datetime=${dateTimeMarkupFrom}>${dateTimeDisplayFrom}</time>
    &mdash;
    <time class="event__end-time" datetime=${dateTimeMarkupTo}>${dateTimeDisplayTo}</time>
  </p>
</div>
<p class="event__price">
  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
</p>
<h4 class="visually-hidden">Offers:</h4>
<ul class="event__selected-offers">
  ${createOffersTemplate(offersSelect)}
</ul>
<button class="event__rollup-btn" type="button">
  <span class="visually-hidden">Open event</span>
</button>
</div>
`
  );
};

export default class PointRouteView extends AbstractView {

  #pointRoute = null;
  #destinations = null;
  #offers = null;

  constructor (pointRoute,destinations,offers) {
    super();
    this.#pointRoute = pointRoute;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createPointRouteTemplate(this.#pointRoute,this.#destinations,this.#offers);
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
