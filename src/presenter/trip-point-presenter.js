import {render, replace, remove} from '../framework/render.js';
import EventView from '../view/event-view';
import EditEventView from '../view/edit-event-view';
import EmptyListView from '../view/empty-list-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class TripPointPresenter {
  #tripListContainer = null;
  #changeData = null;
  #changeMode = null;

  #tripComponent = null;
  #editTripComponent = null;

  #trip = null;
  #mode = Mode.DEFAULT;

  constructor(tripListContaine, changeData, changeMode) {
    this.#tripListContainer = tripListContaine;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init(trip) {
    this.#trip = trip;

    const prevPointComponent = this.#tripComponent;
    const prevPointEditComponent = this.#editTripComponent;

    this.#tripComponent = new EventView(trip);
    this.#editTripComponent = new EditEventView(trip);

    this.#tripComponent.setEditButtonClickHandler(this.#handleEditClick);
    this.#editTripComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#editTripComponent.setFormRemoveHandler(this.#removePoint);
    this.#editTripComponent.setFormCloseHandler(this.#replaceFormToPoint);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#tripComponent, this.#tripListContainer.element);
      return 0;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#tripComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editTripComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy = () => {
    remove(this.#tripComponent);
    remove(this.#editTripComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  };

  #replacePointToForm = () => {
    replace(this.#editTripComponent, this.#tripComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    replace(this.#tripComponent, this.#editTripComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.DEFAULT;
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #removePoint = () => {
    this.destroy();
    if (this.#tripListContainer.element.childElementCount === 0) {
      const epmtyList = new EmptyListView('Everything');
      render(epmtyList, this.#tripListContainer.element);
    }
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleFormSubmit = (point) => {
    this.#changeData(point);
    this.#replaceFormToPoint();
  };
}
