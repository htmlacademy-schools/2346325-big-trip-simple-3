import FiltersView from './view/filters-view.js';
import {render} from './render.js';
import Presenter from './presenter/presenter.js';
import EventModel from './model/event-model.js';

const presenter = new Presenter();
const eventModel = new EventModel();

const tripEventsElement = document.querySelector('.trip-events');
const filtersElement = document.querySelector('.trip-controls__filters');

render(new FiltersView(), filtersElement);

presenter.init(tripEventsElement, eventModel);
