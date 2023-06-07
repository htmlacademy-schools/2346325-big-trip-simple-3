import { generateTripEvents } from '../mock/mock-data.js';

export default class EventModel {
  #tripEvents = generateTripEvents(5);
  get tripEvents() {
    return this.#tripEvents;
  }
}

