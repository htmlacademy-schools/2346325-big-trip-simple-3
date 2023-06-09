import Observable from '../framework/observable.js';

export default class DestinationsModel extends Observable {
  #destinations = null;

  constructor (DESTINATIONS) {
    super();
    this.#destinations = DESTINATIONS;
  }

  get destinations() {
    return this.#destinations;
  }
}
