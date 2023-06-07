import EventsListView from '../view/events-list-view.js';
import EmptyListView from '../view/empty-list-view.js';
import { render, RenderPosition } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import { updateItem } from '../utils/common.js';
import TripPointPresenter from './trip-point-presenter.js';
import { SORT_TYPE } from '../const.js';
import { sortPointsByDay, sortPointsByPrice } from '../utils/sort.js';

class Presenter {
  #filter = 'Everything';
  #currentSortType = SORT_TYPE.DAY;

  #eventsContainer = null;
  #eventModel = null;
  #tripEvents = [];

  #tripListComponent = new EventsListView();
  #sortComponent = new SortView();
  #emptyList = new EmptyListView(this.#filter);
  #tripPointPresenter = new Map();

  constructor(eventsContainer, eventModel) {
    this.#eventsContainer = eventsContainer;
    this.#eventModel = eventModel;
  }

  init = () => {
    this.#tripEvents = [...this.#eventModel.tripEvents];
    this.#renderTrip();
  };

  #renderTrip = () => {

    if(!this.#tripEvents.length) {
      render(this.#emptyList, this.#tripListComponent.element);
    }

    this.#renderSort(this.#currentSortType);
    this.#renderList();
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#eventsContainer, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortTrips(sortType);
    this.#clearEventList();
    this.#renderList();
  };

  #sortTrips = (sortType) => {
    switch (sortType) {
      case SORT_TYPE.DAY:
        this.#tripEvents.sort(sortPointsByDay);
        break;
      case SORT_TYPE.PRICE:
        this.#tripEvents.sort(sortPointsByPrice);
        break;
    }

    this.#currentSortType = sortType;
  };

  #clearEventList = () => {
    this.#tripPointPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPointPresenter.clear();
  };

  #renderList = () => {
    render(this.#tripListComponent, this.#eventsContainer);
    this.#renderEvents();
  };

  #renderEvents = () => {
    this.#tripEvents.forEach((task) => this.#renderEvent(task));
  };

  #renderEvent = (task) => {
    const tripEventPresenter = new TripPointPresenter(this.#tripListComponent, this.#handleEventChange, this.#handleModeChange);
    tripEventPresenter.init(task);
    this.#tripPointPresenter.set(task.id, tripEventPresenter);
  };

  #handleEventChange = (updatedPoint) => {
    this.#tripEvents = updateItem(this.#tripEvents, updatedPoint);
    this.#tripPointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#tripPointPresenter.forEach((presenter) => presenter.resetView());
  };

}

export default Presenter;
