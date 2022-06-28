import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { GuitarData } from '../../types/state';


const initialState: GuitarData = {
  guitars: [],
  isDataLoaded: true,
  guitar: null,
  reviews: [],
  countGuitars: 0,
  similarGuitars: [],
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
    loadCountGuitars: (state, action) => {
      state.countGuitars = action.payload;
    },
    loadSimilarGuitars: (state, action) => {
      state.similarGuitars = action.payload;
    },
  },
});

export const {loadGuitars, loadGuitar, loadCountGuitars, loadSimilarGuitars} = guitarData.actions;
