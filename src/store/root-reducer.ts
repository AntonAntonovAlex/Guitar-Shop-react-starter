import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { guitarData } from './guitar-data/guitar-data';


export const rootReducer = combineReducers({
  [NameSpace.Data]: guitarData.reducer,
});
