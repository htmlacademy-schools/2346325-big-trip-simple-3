import { generateTripEvents } from '../mock/mock-data.js';

export default class EventModel {
  tripEvents = generateTripEvents(5);
  getEvents = () => this.tripEvents;
}

