import { State } from './interfaces';
import { getItemFromLocalStorage, setItemToLocalStorage } from './utils';

class AppStore {
  private _state: State = {
    people: getItemFromLocalStorage('people') || [],
    searchText: getItemFromLocalStorage('searchText') || '',
  };

  private localStorageItems: string[] = ['people', 'searchText'];

  get state(): State {
    return Object.freeze(this._state);
  }

  setState = (state: Partial<State>): void => {
    Object.entries(state).map(([key, value]) => {
      if (this.localStorageItems.includes(key)) {
        setItemToLocalStorage(key, value);
      }
    });

    this._state = { ...this._state, ...state };
  };
}

export const appStore = new AppStore();
