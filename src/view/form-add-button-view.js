import AbstractView from '../framework/view/abstract-view';

const createAddPointButtonTemplate = () => (`
  <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
  `);

export default class FormAddButtonView extends AbstractView {
  get template() {
    return createAddPointButtonTemplate();
  }

  setOnAddPointButtonClick = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#onAddPointButtonClick);
  };

  #onAddPointButtonClick = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
