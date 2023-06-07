import EditEventView from '../view/edit-event-view.js';
import EventView from '../view/event-view.js';
import EventsListView from '../view/events-list-view.js';
import EmptyListView from '../view/empty-list-view.js';
import {render} from '../render.js';

class Presenter {
  #tripListComponent = new EventsListView();

  #eventsContainer = null;
  #eventModel = null;
  #tripEvents = null;

  #filter = 'Everything';

  init = (eventsContainer, eventModel) => {
    this.#eventsContainer = eventsContainer;

    this.#eventModel = eventModel;
    this.#tripEvents = [...this.#eventModel.tripEvents];

    render(this.#tripListComponent, this.#eventsContainer);
    if(this.#tripEvents.length) {
      for (let i = 0; i < this.#tripEvents.length; i++) {
        this.#renderTrip(this.#tripEvents[i]);
      }
    } else {
      render(new EmptyListView(this.#filter), this.#tripListComponent.element);
    }
  };

  #renderTrip = (trip) => {
    const tripComponent = new EventView(trip);
    const editTripComponent = new EditEventView(trip);
    let onEditorEscKeydownListener;

    const replaceRoutePointToForm = () => {
      this.#tripListComponent.element.replaceChild(editTripComponent.element, tripComponent.element);
    };

    const replaceFormToRoutePoint = () => {
      this.#tripListComponent.element.replaceChild(tripComponent.element, editTripComponent.element);
    };

    const removeRoutePoint = () => {
      this.#tripListComponent.element.removeChild(editTripComponent.element);
      document.removeEventListener('keydown', onEditorEscKeydownListener);
    };

    const onEscKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        replaceFormToRoutePoint();
        document.body.removeEventListener('keydown', onEscKeyDown);
      }
    };

    tripComponent.setEditButtonClickHandler(() => {
      replaceRoutePointToForm();
      document.body.addEventListener('keydown', onEscKeyDown);
    });

    editTripComponent.setFormSubmitHandler(() => {
      replaceFormToRoutePoint();
      document.body.removeEventListener('keydown', onEscKeyDown);
    });

    editTripComponent.setFormSubmitHandler(() => {
      replaceFormToRoutePoint();
      document.body.removeEventListener('keydown', onEscKeyDown);
    });

    editTripComponent.setCloseHandler(() => {
      removeRoutePoint();
      document.body.removeEventListener('keydown', onEscKeyDown);
    });

    render(tripComponent, this.#tripListComponent.element);
  };
}

export default Presenter;
