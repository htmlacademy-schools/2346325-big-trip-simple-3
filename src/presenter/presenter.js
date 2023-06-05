import CreateEventView from '../view/create-event-view.js';
import EditEventView from '../view/edit-event-view.js';
import EventView from '../view/event-view.js';
import EventsListView from '../view/events-list-view.js';
import SortView from '../view/sort-view.js';
import {render} from '../render.js';

export default class Presenter {
  tripListComponent = new EventsListView();
  eventCreateComponent = new CreateEventView();
  eventEditComponent = new EditEventView();
  sortViewComponent = new SortView();

  init = (eventsContainer) => {
    this.eventsContainer = eventsContainer;

    render(this.sortViewComponent, this.eventsContainer);
    render(this.tripListComponent, this.eventsContainer);
    render(this.eventEditComponent, this.tripListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EventView(), this.tripListComponent.getElement());
    }
  };
}
