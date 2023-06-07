import {createElement} from '../render.js';

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

export default class EmptyListView {
  #element = null;
  #filter = null;

  constructor(filter) {
    this.#filter = filter;
  }

  get template() {
    return createEmptyListTemplate(this.#filter);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
