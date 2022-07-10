import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { GuitarData } from '../../types/state';


const initialState: GuitarData = {
  guitars: [],
  isDataLoaded: false,
  guitar: null,
  reviews: [],
  countGuitars: 0,
  similarGuitars: [],
  expensiveGuitar: [],
  cheapestGuitar: [],
  isLoadingGuitars: true,
};

export const guitarData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    loadGuitars: (state, action) => {
      state.guitars = action.payload;
      state.isDataLoaded = true;
      state.isLoadingGuitars = false;
    },
    loadGuitar: (state, action) => {
      if (action.payload) {
        state.guitar = action.payload.guitar;
        state.reviews = action.payload.reviews;
      }
      state.isLoadingGuitars = false;
    },
    loadCountGuitars: (state, action) => {
      state.countGuitars = action.payload;
    },
    loadSimilarGuitars: (state, action) => {
      state.similarGuitars = action.payload;
      state.isLoadingGuitars = false;
    },
    loadPriceGuitar: (state, action) => {
      if (action.payload) {
        state.expensiveGuitar = action.payload.expensiveGuitar;
        state.cheapestGuitar = action.payload.cheapestGuitar;
      }
      state.isDataLoaded = true;
    },
    changeLoadingGuitarsStatus: (state, action) => {
      state.isLoadingGuitars = action.payload;
    },
  },
});

export const {loadGuitars, loadGuitar, loadCountGuitars, loadSimilarGuitars, loadPriceGuitar, changeLoadingGuitarsStatus} = guitarData.actions;
