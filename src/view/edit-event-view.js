import {humanizePointTime} from '../utils/common.js';
import {TRIP_EVENT_TYPES, DESTINATION_NAMES} from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { destinations, allOffers } from '../mock/trip.js';
import { getIdFromTag } from '../utils/common.js';

const createEventEditTemplate = (event) => {
  const {dateFrom, dateTo, type, stateOffers, destination, basePrice} = event;

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${TRIP_EVENT_TYPES.map((item) => (`
                  <div class="event__type-item">
                    <input id="event-type-${item}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item}">
                    <label class="event__type-label  event__type-label--${item}" for="event-type-${item}-1">${item}</label>
                  </div>
                `)).join('')}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${destination.name} list="destination-list-1">
            <datalist id="destination-list-1">
            ${DESTINATION_NAMES.map((item) => (`
            <option value=${item}></option>
                `)).join('')}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizePointTime(dateFrom)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizePointTime(dateTo)}">
          </div>
          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${stateOffers.length > 0 ? stateOffers.map((offer) => (`<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="event-offer-${offer.id}" ${offer.isChecked ? 'checked' : ''}>
              <label class="event__offer-label" for="event-offer-${offer.id}">
                      <span class="event__offer-title">${offer.title}</span>
                      &plus;&euro;&nbsp;
                      <span class="event__offer-price">${offer.price}</span>
                    </label>
                  </div>
                `)).join('') : ''
    }
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${destination.description}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
              ${destination.pictures.length > 0 ? destination.pictures.map((pic) => (
      `<img class="event__photo" src="${pic.src}" alt="Event photo">
                          `)).join('') : ''
    }
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>`
  );
};

export default class EditEventView extends AbstractStatefulView {
  _state = null;

  //static parseEventToState = (event) => ({...event,
  //});

  static parseEventToState = (event) => {
    const offs = [];
    for (const off of Object.values(allOffers)) {
      offs.push({...off, 'isChecked': event.offers.includes(off.id)});
    }
    return {...event, 'stateOffers': offs};
  };

  static parseStateToEvent = (state) => {
    const event = {...state};
    const noffers = [];
    event.stateOffers.map((stoff) => {
      if (stoff.isChecked) {
        noffers.push({
          id: stoff.id,
          title: stoff.title,
          price: stoff.price
        });
      }
    });
    event.offers = noffers;
    delete event.stateOffers;
    return event;
  };

  constructor(event) {
    super();
    this._state = EditEventView.parseEventToState(event);
    this.#setInnerHandlers();
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list')
      .addEventListener('change', this.#changeType);
    this.element.querySelector('.event__input--destination')
      .addEventListener('input', this.#changeDestination);
    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#changePrice);
    for (const offer of this._state.stateOffers) {
      this.element.querySelector(`#event-offer-${offer.id}`)
        .addEventListener('click', this.#changeOffers);
    }
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormCloseHandler(this._callback.closeForm);
    this.setFormRemoveHandler(this._callback.formRemove);
  };

  #changeType = (evt) => {
    evt.preventDefault();
    const fieldset = this.element.querySelector('.event__type-list');
    const newType = fieldset.querySelector('input:checked').value;
    this.updateElement({
      type: newType,
      'stateOffers': new Array(),
    });
  };

  #changeDestination = (evt) => {
    evt.preventDefault();
    const newDestinationName = event.target.value;
    let newDestination = null;
    Object.values(destinations).forEach((destination) => {
      if (newDestinationName === destination.name) {
        newDestination = destination;
        this.updateElement({
          destination: newDestination,
        });
      }
    });
  };

  #changePrice = (evt) => {
    evt.preventDefault();
    const newPrice = event.target.value;
    this._setState({
      basePrice: newPrice,
    });
  };

  #changeOffers = (evt) => {
    evt.preventDefault();
    const clickedOfferId = getIdFromTag(evt.target);
    const stateOffers = this._state.stateOffers;
    for (const offer of stateOffers) {
      if (offer.id === clickedOfferId) {
        offer.isChecked = !offer.isChecked;
        break;
      }
    }
    this.updateElement({
      'stateOffers': stateOffers,
    });
  };


  get template() {
    return createEventEditTemplate(this._state);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditEventView.parseStateToEvent(this._state));
  };

  setFormRemoveHandler = (callback) => {
    this._callback.formRemove = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formRemoveHandler);
  };

  #formRemoveHandler = (evt) => {
    evt.preventDefault();
    this._callback.formRemove();
  };

  setFormCloseHandler = (callback) => {
    this._callback.closeForm = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formCloseHandler);
  };

  #formCloseHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeForm();
  };

  reset = (event) => {
    this.updateElement(EditEventView.parseEventToState(event));
  };
}
