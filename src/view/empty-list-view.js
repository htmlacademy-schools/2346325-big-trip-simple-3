import {createElement} from '../render.js';
import AbstractView from '../framework/view/abstract-view.js';

const createEmptyListTemplate = (filter) => {
  if (filter === 'Everything') {
    return `
    <p class="trip-events__msg">Click "+New Event" to add your first trip</p>
    `;
  } else if (filter === 'Past') {
    return `
    <p class="trip-events__msg">There are no past events now</p>
    `;
  } else if (filter === 'Future') {
    return `
    <p class="trip-events__msg">There are no future events now</p>
    `;
  }
  throw new Error('Unexpected filter');
};

export default class EmptyListView extends AbstractView {
  #filter = null;

  constructor(filter) {
    super();
    this.#filter = filter;
  }

  get template() {
    return createEmptyListTemplate(this.#filter);
  }

}
