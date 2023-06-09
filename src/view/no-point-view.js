import AbstractView from '../framework/view/abstract-view.js';

const noPointTemplate = () => `
<p class="trip-events__msg">Click New Event to create your first point</p>
`;
export default class NoPoint extends AbstractView {

  get template () {
    return noPointTemplate;
  }
}
