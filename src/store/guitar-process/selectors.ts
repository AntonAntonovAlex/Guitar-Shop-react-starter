import { NameSpace } from '../../const';
import { GuitarCart } from '../../types/guitar-cart';
import { State } from '../../types/state';

export const getActivPage = (state: State): number => state[NameSpace.Guitar].activPage;
export const getCountReviews = (state: State): number => state[NameSpace.Guitar].countReviews;
export const getIdGuitarForCart = (state: State): number => state[NameSpace.Guitar].idGuitarForCart;
export const getGuitarsCart = (state: State): GuitarCart => state[NameSpace.Guitar].guitarsCart;
export const getCartBonus = (state: State): number => state[NameSpace.Guitar].cartBonus;
