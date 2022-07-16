import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, STEP_COUNT_REVIEWS } from '../../const';
import { GuitarProcess } from '../../types/state';

const initialState: GuitarProcess = {
  activPage: 1,
  countReviews: STEP_COUNT_REVIEWS,
  idCardForCart: 0,
  guitarCart: new Map(),
};

export const guitarProcess = createSlice({
  name: NameSpace.Guitar,
  initialState,
  reducers: {
    changeActivPage: (state, action) => {
      state.activPage = action.payload;
    },
    incrementCountReviews: (state) => {
      state.countReviews = state.countReviews + STEP_COUNT_REVIEWS;
    },
    resetCountReviews: (state) => {
      state.countReviews = STEP_COUNT_REVIEWS;
    },
    changeIdCardForCart: (state, action) => {
      state.idCardForCart = action.payload;
    },
  },
});

export const {changeActivPage, incrementCountReviews, resetCountReviews, changeIdCardForCart} = guitarProcess.actions;
