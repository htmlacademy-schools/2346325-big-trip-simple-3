import { render, remove, RenderPosition } from '../framework/render.js';
import { UserAction, UpdateType } from '../const.js';
import FormAddView from '../view/form-add-view.js';

export default class AddPointPresenter {
  #destroyCallback = null;

  #addPointComponent = null;
  #tripPointsListContainer = null;

  #changeData = null;

  constructor(tripPointsListContainer, changeData) {
    this.#tripPointsListContainer = tripPointsListContainer;
    this.#changeData = changeData;
  }

  init = (destinations, offersByType, destroyCallback) => {
    this.#destroyCallback = destroyCallback;

    if (this.#addPointComponent !== null) {
      return;
    }

    this.#addPointComponent = new FormAddView (undefined, destinations, offersByType);

    this.#addPointComponent.setOnCancelPointButtonClick(this.#onCancelButtonClick);
    this.#addPointComponent.setOnClosePointButtonClick(this.#onCloseButtonClick);
    this.#addPointComponent.setOnSubmitPointForm(this.#onFormSubmit);

    render(this.#addPointComponent, this.#tripPointsListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  setSaving = () => {
    this.#addPointComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#addPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
      });
    };

    this.#addPointComponent.shake(resetFormState);
  };

  destroy = () => {
    if (this.#addPointComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#addPointComponent);
    this.#addPointComponent = null;

    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #onCancelButtonClick = () => {
    this.destroy();
  };

  #onCloseButtonClick = () => {
    this.destroy();
  };

  #onFormSubmit = (point) => {
    this.#changeData(UserAction.ADD_POINT, UpdateType.MINOR, point);
    this.destroy();
  };
}
