import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class RoutePointModel extends Observable{
  #tripPointsApiService = null;
  #points = [];
  #destinations = [];
  #offersByType = [];

  constructor (tripPointsApiService) {
    super();
    this.#tripPointsApiService = tripPointsApiService;
  }

  get points () {
    return this.#points;
  }

  get offersByType () {
    return this.#offersByType;
  }

  get destinations () {
    return this.#destinations;
  }

  init = async () => {
    try {
      const points = await this.#tripPointsApiService.points;
      this.#points = points.map(this.#adaptToClient);
    } catch(err) {
      this.#points = [];
    }

    try {
      this.#destinations = await this.#tripPointsApiService.destinations;
    } catch(err) {
      this.#destinations = [];
    }

    try {
      this.#offersByType = await this.#tripPointsApiService.offersByType;
    } catch(err) {
      this.#offersByType = [];
    }

    this._notify(UpdateType.INIT);
  };

  updatePoint = async (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    const response = await this.#tripPointsApiService.updatePoint(update);
    try {
      const updatedPoint = this.#adaptToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1)
      ];
      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
  };

  addPoint = async (updateType, update) => {
    try {
      const response = await this.#tripPointsApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint);
    } catch(err) {
      throw new Error('Can\'t add point');
    }
  };

  deletePoint = async (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this.#tripPointsApiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1)
      ];

      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete event');
    }
  };

  #adaptToClient = (point) => {
    const adaptedPoint = {...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'],
      dateTo: point['date_to'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];

    return adaptedPoint;
  };
}
