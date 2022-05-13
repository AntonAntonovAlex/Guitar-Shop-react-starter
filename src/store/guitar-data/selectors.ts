import { NameSpace } from '../../const';
import { Guitar } from '../../types/guitar';
import { Review } from '../../types/review';
import { State } from '../../types/state';

export const getGuitars = (state: State): Guitar[] => state[NameSpace.Data].guitars;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.Data].isDataLoaded;
export const getGuitar = (state: State): Guitar | null => state[NameSpace.Data].guitar;
export const getReviews = (state: State): Review[] => state[NameSpace.Data].reviews;
