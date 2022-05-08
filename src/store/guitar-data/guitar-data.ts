import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { GuitarData } from '../../types/state';


const initialState: GuitarData = {
  guitars: [],
  isDataLoaded: false,
};

export const guitarData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    loadGuitars: (state, action) => {
      state.guitars = action.payload;
      state.isDataLoaded = true;
    },
  },
});

export const {loadGuitars} = guitarData.actions;
