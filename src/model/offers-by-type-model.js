import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class OffersByTypeModel extends Observable {
  #tripPointsApiService = null;
  #offersByType = [];

  constructor (tripPointsApiService) {
    super();
    this.#tripPointsApiService = tripPointsApiService;
  }

  get offersByType() {
    return this.#offersByType;
  }

  init = async () => {
    try {
      this.#offersByType = await this.#tripPointsApiService.offersByType;
    } catch(err) {
      this.#offersByType = [];
    }

    this._notify(UpdateType.INIT);
  };
}
