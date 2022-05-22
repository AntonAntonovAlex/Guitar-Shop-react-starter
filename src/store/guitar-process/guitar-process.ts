import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, STEP_COUNT_REVIEWS } from '../../const';
import { GuitarProcess } from '../../types/state';

const initialState: GuitarProcess = {
  activPage: 1,
  countReviews: STEP_COUNT_REVIEWS,
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
  },
});

export const {changeActivPage, incrementCountReviews, resetCountReviews} = guitarProcess.actions;
