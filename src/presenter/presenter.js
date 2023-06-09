import {render} from '../framework/render.js';
// import FormAdd from '../view/form-add-view';
import PointPresenter from './trip-point-presenter.js';
import PointList from '../view/point-list-view';
import NoPoint from '../view/no-point-view';
import Sort from '../view/sort-view';
import {updateItem} from '../utils/common-utils.js';
import { SortType } from '../mock/const.js';
import {sortPointDay,sortPointPrice} from '../utils/point-utils';
export default class RoutePresenter {
  #pointList = new PointList ();
  #sort = new Sort ();
  #noPoint = new NoPoint();

  #containerElement = null;
  #pointModel = null;

  #points = null;
  #destinations = null;
  #offers = null;
  #pointPresenter = new Map();
  #currentSortType = SortType.DATE;
  #sourceRoutePoints = [];

  constructor (containerElement,pointModel) {
    this.#containerElement = containerElement;
    this.#pointModel = pointModel;
  }

  init = () => {
    this.#points = [...this.#pointModel.points];
    this.#destinations = [...this.#pointModel.destinations];
    this.#offers = [...this.#pointModel.offers];
    // render(new FormAdd (this.#routePoints[0],this.#destinations,this.#offers) , this.#formList.element);

    this.#sourceRoutePoints = [...this.#pointModel.points];

    this.#renderTripPoints();
  };

  #onModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #onPointChange = (updatedPointRoute,destinations,offers) => {
    this.#points = updateItem(this.#points,updatedPointRoute);
    this.#sourceRoutePoints = updateItem(this.#sourceRoutePoints,updatedPointRoute );
    this.#pointPresenter.get(updatedPointRoute.id).init(updatedPointRoute,destinations,offers);
  };

  #sortPoint = (sortType) => {

    switch (sortType) {
      case SortType.DAY:
        this.#points.sort(sortPointDay);
        break;
      case SortType.PRICE:
        this.#points.sort(sortPointPrice);
        break;
      default:
        this.#points = [...this.#sourceRoutePoints];
    }

    this.#currentSortType = sortType;
  };

  #onSortTypeChange = (sortType) => {

    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoint(sortType);
    this.#clearPointList();
    this.#renderTripPoints();
  };

  #renderPoint = (pointRoute,destinations,offers) => {
    const pointPresenter = new PointPresenter(this.#pointList.element,this.#onPointChange,this.#onModeChange);
    pointPresenter.init(pointRoute,destinations,offers);
    this.#pointPresenter.set(pointRoute.id,pointPresenter);
  };

  #renderNoPoint = () => {
    render (this.#noPoint, this.#containerElement);
  };

  #renderSort = () => {
    render (this.#sort, this.#containerElement);
    this.#sort.setSortTypeChangeHandler(this.#onSortTypeChange);
  };

  #rednerFormList = () => {
    render (this.#pointList , this.#containerElement);
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #renderTripPoints = () => {
    if (this.#points.length === 0) {
      this.#renderNoPoint();
    } else {
      this.#renderSort();
      this.#rednerFormList();
      for (let i = 0;i < this.#points.length; i++) {
        this.#renderPoint(this.#points[i],this.#destinations,this.#offers);
      }
    }
  };
}
