import { store } from '../store';
import { Guitar } from './guitar';
import { Review } from './review';

export type GuitarData = {
    guitars: Guitar[],
    isDataLoaded: boolean,
    guitar: Guitar | null,
    reviews: Review[],
    countGuitars: number,
    similarGuitars: Guitar[],
    expensiveGuitar: Guitar[],
    cheapestGuitar: Guitar[],
    isLoadingGuitars: boolean,
};

export type GuitarProcess = {
  activPage: number,
  countReviews: number,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
