import {render, replace, remove} from '../framework/render.js';
import FilterView from '../view/filters-view.js';
import {FilterType, UpdateType} from '../mock/const.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #tripEventsModel = null;

  #filterComponent = null;

  constructor(filterContainer, filterModel, tripEventsModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#tripEventsModel = tripEventsModel;

    this.#tripEventsModel.addObserver(this.#onModelPoint);
    this.#filterModel.addObserver(this.#onModelPoint);
  }

  get filters() {
    return [
      {
        type: FilterType.EVERYTHING,
        name: 'Everything',
      },
      {
        type: FilterType.FUTURE,
        name: 'Future',
      }
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(filters, this.#filterModel.filter);
    this.#filterComponent.setOnFilterTypeChange(this.#onFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #onModelPoint = () => {
    this.init();
  };

  #onFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
