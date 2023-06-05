import FiltersView from './view/filters-view.js';
import {render} from './render.js';
import Presenter from './presenter/presenter.js';

const presenter = new Presenter();

const tripEventsElement = document.querySelector('.trip-events');
const filtersElement = document.querySelector('.trip-controls__filters');

render(new FiltersView(), filtersElement);

presenter.init(tripEventsElement);
