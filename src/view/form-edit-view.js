import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizePointDate, isOfferChecked } from '../utils/point-utils.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import he from 'he';

const createOffersTemplate = (offers,offersByType,type) => {
  const offersByCurrentType = offersByType.find((element) => element.type === type).offers;
  return offersByCurrentType.map(({ id, title, price }) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title}-1" type="checkbox" name="event-offer-${title}" data-offer-id="${id}" ${isOfferChecked(offers, id) ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-${title}-1">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`
  ).join('');
};

const createNameTemplate = (destinations) => {
  const nameByType = destinations.map((element) => element.name );
  return nameByType.map((name) =>
    `<option value="${name}"></option>
`).join('');
};

const createTypeTemplate = (offersByType,type) => {
  const pointByType = offersByType.map((element) => element.type );

  return pointByType.map((pointType) =>
    `<div class="event__type-item">
    <input id="event-type-${pointType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}" ${pointType === type ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-1">${pointType}</label>
  </div>`
  ).join('');
};

const createFormEditTemplate = (pointRoute,destinations,offersByType) => {
  const {basePrice,dateFrom,dateTo,destination,type,offers} = pointRoute;

  const destinationName = destinations.find((element) => element.id === destination).name;
  const destinationDescription = destinations.find((element) => element.id === destination).description;

  const dataFromDisplay = humanizePointDate(dateFrom, 'DD/MM/YY HH:mm');
  const dataToDisplay = humanizePointDate(dateTo, 'DD/MM/YY HH:mm');
  return (
    ` <li class="trip-events__item ">
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
          ${createTypeTemplate(offersByType,type)}
          </fieldset>
        </div>
      </div>
      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(destinationName)}" list="destination-list-1">
        <datalist id="destination-list-1">
        ${createNameTemplate(destinations)}
        </datalist>
      </div>
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dataFromDisplay}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dataToDisplay}">
      </div>
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="number" min="1" max="9999999"  name="event-price" value="${basePrice}">
      </div>
      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
      </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
        ${createOffersTemplate(offers,offersByType,type)}
        </div>
      </section>
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destinationDescription}</p>
      </section>
    </section>
  </form>
</li> `
  );
};

export default class FormEditView extends AbstractStatefulView {
  #pointRoute = null;
  #destinations = null;
  #offers = null;
  #dateFromPicker = null;
  #dateToPicker = null;

  constructor (pointRoute,destinations,offers) {
    super();
    this._state = FormEditView.parsePointToState(pointRoute);
    this.#destinations = destinations;
    this.#offers = offers;
    this.#setInnerHandlers();
    this.#setDatepicker();
  }

  get template() {
    return createFormEditTemplate(this._state,this.#destinations,this.#offers);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#dateFromPicker) {
      this.#dateFromPicker.destroy();
      this.#dateFromPicker = null;
    }
    if (this.#dateToPicker) {
      this.#dateToPicker.destroy();
      this.#dateToPicker = null;
    }
  };

  reset = (pointRoute) => {
    this.updateElement (
      FormEditView.parsePointToState(pointRoute)
    );
  };

  #dueDateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dueDateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setDatepicker = () => {

    this.#dateFromPicker = flatpickr(this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        onChange: this.#dueDateFromChangeHandler
      });

    this.#dateToPicker = flatpickr(this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        onChange: this.#dueDateToChangeHandler
      });
  };

  setFormCLose = (callback) => {
    this._callback.formClose = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formCloseHandler);
  };

  #formCloseHandler = (evt) => {
    evt.preventDefault();
    this._callback.formClose();
  };

  setFormSubmit = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(FormEditView.parseStateToPoint(this._state),this.#destinations,this.#offers );
  };

  #setInnerHandlers = () => {
    this.element.addEventListener('change', this.#onOfferChange);
    this.element.addEventListener('change', this.#onEventTypeChange);
    this.element.addEventListener('change', this.#onDestinationChange);
    this.element.addEventListener('change', this.#onPriceChange);
  };

  #onOfferChange = (evt) => {
    if (!evt.target.closest('input[type="checkbox"].event__offer-checkbox')) {
      return;
    }

    evt.preventDefault();
    const checkedOffers = [...this._state.offers];
    if (evt.target.checked) {
      checkedOffers.push(Number(evt.target.dataset.offerId));
    } else {
      const idIndex = checkedOffers.indexOf(Number(evt.target.dataset.offerId));
      checkedOffers.splice(idIndex, 1);
    }

    this.updateElement({
      offers: checkedOffers
    });
  };

  #onEventTypeChange = (evt) => {
    if (!evt.target.closest('input[type="radio"].event__type-input')) {
      return;
    }

    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: []
    });
  };

  #onDestinationChange = (evt) => {
    if (!evt.target.closest('input[type="text"].event__input--destination')) {
      return;
    }

    evt.preventDefault();
    const newDestination = this.#destinations.find((destination) => destination.name === evt.target.value).id;
    this.updateElement({
      destination: newDestination
    });
  };

  setFormDelete = (callback) => {
    this._callback.formDelete = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#onDeletePointButtonClick);
  };

  #onPriceChange = (evt) => {
    if (!evt.target.closest('input[type="number"].event__input--price')) {
      return;
    }

    evt.preventDefault();
    this.updateElement({
      basePrice: evt.target.value
    });
  };

  #onDeletePointButtonClick = (evt) => {
    evt.preventDefault();
    this._callback.formDelete(FormEditView.parseStateToPoint(this._state));
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmit(this._callback.formSubmit);
    this.setFormCLose(this._callback.formClose);
    this.setFormDelete(this._callback.formDelete);
    this.#setDatepicker();
  };

  static parsePointToState = (pointRoute) => ({...pointRoute});

  static parseStateToPoint = (state) => {
    const pointRoute = {...state};
    return pointRoute;
  };
}
