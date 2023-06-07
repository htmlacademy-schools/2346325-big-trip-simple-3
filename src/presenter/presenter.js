import EditEventView from '../view/edit-event-view.js';
import EventView from '../view/event-view.js';
import EventsListView from '../view/events-list-view.js';
import EmptyListView from '../view/empty-list-view.js';
import {render} from '../render.js';
import { createOnEscKeydownFun } from '../utils.js';

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
        this.#renderEvent(this.#tripEvents[i]);
      }
    } else {
      render(new EmptyListView(this.#filter), this.#tripListComponent.element);
    }
  };

  #renderEvent = (task) => {
    const eventComponent = new EventView(task);
    const editEventComponent = new EditEventView(task);
    let onEditorEscKeydownListener;

    const replaceRoutePointToForm = () => {
      this.#tripListComponent.element.replaceChild(editEventComponent.element, eventComponent.element);
    };

    const replaceFormToRoutePoint = () => {
      this.#tripListComponent.element.replaceChild(eventComponent.element, editEventComponent.element);
      document.removeEventListener('keydown', onEditorEscKeydownListener);
    };

    const removeRoutePoint = () => {
      this.#tripListComponent.element.removeChild(editEventComponent.element);
      document.removeEventListener('keydown', onEditorEscKeydownListener);
    };

    eventComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceRoutePointToForm();
      onEditorEscKeydownListener = createOnEscKeydownFun(document, replaceFormToRoutePoint);
    });

    editEventComponent.element.querySelector('.event--edit').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToRoutePoint();
    });

    editEventComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToRoutePoint();
    });

    editEventComponent.element.querySelector('.event__reset-btn').addEventListener('click', () => {
      removeRoutePoint();
      editEventComponent.removeElement();
      eventComponent.removeElement();
    });

    render(eventComponent, this.#tripListComponent.element);
  };
}

export default Presenter;
