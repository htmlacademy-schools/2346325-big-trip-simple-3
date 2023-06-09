import { render } from './framework/render.js';
import TripPointsApiService from './trip-points-api-service.js';
const AUTHORIZATION = 'Basic slo34rlodir984uj';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';
const tripPointsApiService = new TripPointsApiService(END_POINT, AUTHORIZATION);


import PointModel from './model/route-point-model';
import DestinationsModel from './model/destinations-model.js';
import OffersByTypeModel from './model/offers-by-type-model.js';

import FilterModel from './model/filter-model.js';

import FilterPresenter from './presenter/filter-presenter.js';
import TripPointPresenter from './presenter/presenter.js';

import FormAddButtonView from './view/form-add-button-view.js';

const formAddButtonComponent = new FormAddButtonView();
const formAddButtonContainer = document.querySelector('.trip-main');

const containerFilterPlace = document.querySelector('.trip-controls__filters');
const containerPlace = document.querySelector('.trip-events');

const pointModel = new PointModel(tripPointsApiService);
const destinationsModel = new DestinationsModel(tripPointsApiService);
const offersByTypeModel = new OffersByTypeModel(tripPointsApiService);
const filterModel = new FilterModel();


const tripPointPresenter = new TripPointPresenter(containerPlace, pointModel,destinationsModel, offersByTypeModel, filterModel);
const filterPresenter = new FilterPresenter(containerFilterPlace, filterModel, pointModel);

const onAddPointFormClose = () => {
  formAddButtonComponent.element.disabled = false;
};

const onAddPointButtonClick = () => {
  tripPointPresenter.createTripPoint(onAddPointFormClose);
  formAddButtonComponent.element.disabled = true;
};

render(formAddButtonComponent, formAddButtonContainer);
formAddButtonComponent.setOnAddPointButtonClick(onAddPointButtonClick);

filterPresenter.init();
tripPointPresenter.init();

Promise.all([destinationsModel.init(), offersByTypeModel.init(), pointModel.init()])
  .then(() => {
    render(formAddButtonComponent, formAddButtonContainer);
    formAddButtonComponent.setOnAddPointButtonClick(onAddPointButtonClick);
  });
