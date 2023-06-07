import FiltersView from './view/filters-view.js';
import {render} from './render.js';
import Presenter from './presenter/presenter.js';
import EventModel from './model/event-model.js';
import { generateFilters } from './mock/filters.js';


const eventModel = new EventModel();

const tripEventsElement = document.querySelector('.trip-events');
const filtersElement = document.querySelector('.trip-controls__filters');

const presenter = new Presenter(tripEventsElement, eventModel);
presenter.init();

const filters = generateFilters(eventModel.tripEvents);
render(new FiltersView(filters), filtersElement);

