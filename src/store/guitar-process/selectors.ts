import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getActivPage = (state: State): number => state[NameSpace.Guitar].activPage;
export const getCountReviews = (state: State): number => state[NameSpace.Guitar].countReviews;
