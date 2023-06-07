import { generateTripEvents } from '../mock/trip.js';

export default class EventModel {
  #tripEvents = generateTripEvents(5);
  get tripEvents() {
    return this.#tripEvents;
  }
}

