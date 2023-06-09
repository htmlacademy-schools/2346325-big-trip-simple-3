import { render } from './framework/render.js';
import TripPointsApiService from './trip-points-api-service.js';
import { generateAuthorizationKey } from './utils/common-utils.js';

import RoutePointModel from './model/route-point-model';
import FilterModel from './model/filter-model.js';

import FilterPresenter from './presenter/filter-presenter.js';
import Presenter from './presenter/presenter.js';

import FormAddButtonView from './view/form-add-button-view.js';

const AUTHORIZATION = `Basic ${generateAuthorizationKey(10)}`;
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';
const tripPointsApiService = new TripPointsApiService(END_POINT, AUTHORIZATION);

const formAddButtonComponent = new FormAddButtonView();
const formAddButtonContainer = document.querySelector('.trip-main');

const containerFilterPlace = document.querySelector('.trip-controls__filters');
const containerPlace = document.querySelector('.trip-events');

const pointModel = new RoutePointModel(tripPointsApiService);
const filterModel = new FilterModel();

const presenter = new Presenter(containerPlace, pointModel, filterModel);
const filterPresenter = new FilterPresenter(containerFilterPlace, filterModel, pointModel);

const onAddPointFormClose = () => {
  formAddButtonComponent.element.disabled = false;
};

const onAddPointButtonClick = () => {
  presenter.createTripPoint(onAddPointFormClose);
  formAddButtonComponent.element.disabled = true;
};

render(formAddButtonComponent, formAddButtonContainer);
formAddButtonComponent.setOnAddPointButtonClick(onAddPointButtonClick);

filterPresenter.init();
presenter.init();

pointModel.init().finally(() => {
  render(formAddButtonComponent, formAddButtonContainer);
  formAddButtonComponent.setOnAddPointButtonClick(onAddPointButtonClick);
});
