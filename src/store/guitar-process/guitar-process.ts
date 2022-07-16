import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, STEP_COUNT_REVIEWS } from '../../const';
import { GuitarProcess } from '../../types/state';

const initialState: GuitarProcess = {
  activPage: 1,
  countReviews: STEP_COUNT_REVIEWS,
  idGuitarForCart: 0,
  guitarsCart: {},
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
    changeIdGuitarForCart: (state, action) => {
      state.idGuitarForCart = action.payload;
    },
    addGuitarsCart: (state, action) => {
      if (action.payload.id in state.guitarsCart) {
        state.guitarsCart[action.payload.id].count += 1;
        return;
      }
      state.guitarsCart[action.payload.id] = {
        name: action.payload.name,
        vendorCode: action.payload.vendorCode,
        previewImg: action.payload.previewImg,
        type: action.payload.type,
        price: action.payload.price,
        stringCount: action.payload.stringCount,
        count: 1,
      };
    },
  },
});

export const {changeActivPage, incrementCountReviews, resetCountReviews, changeIdGuitarForCart, addGuitarsCart} = guitarProcess.actions;
