import { NameSpace } from '../../const';
import { Guitar } from '../../types/guitar';
import { State } from '../../types/state';

export const getGuitars = (state: State): Guitar[] => state[NameSpace.Data].guitars;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.Data].isDataLoaded;
