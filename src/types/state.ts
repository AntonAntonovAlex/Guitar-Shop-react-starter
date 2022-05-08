import { store } from '../store';
import { Guitar } from './guitar';

export type GuitarData = {
    guitars: Guitar[],
    isDataLoaded: boolean,
  };

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
