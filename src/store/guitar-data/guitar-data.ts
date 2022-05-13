import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { GuitarData } from '../../types/state';


const initialState: GuitarData = {
  guitars: [],
  isDataLoaded: false,
  guitar: null,
  reviews: [],
};

export const guitarData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    loadGuitars: (state, action) => {
      state.guitars = action.payload;
      state.isDataLoaded = true;
    },
    loadGuitar: (state, action) => {
      if (action.payload) {
        state.guitar = action.payload.guitar;
        state.reviews = action.payload.reviews;
      }
    },
  },
});

export const {loadGuitars, loadGuitar} = guitarData.actions;
