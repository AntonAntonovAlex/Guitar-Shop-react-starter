import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { guitarData } from './guitar-data/guitar-data';
import { guitarProcess } from './guitar-process/guitar-process';


export const rootReducer = combineReducers({
  [NameSpace.Data]: guitarData.reducer,
  [NameSpace.Guitar]: guitarProcess.reducer,
});
