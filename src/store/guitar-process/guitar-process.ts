import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { GuitarProcess } from '../../types/state';

const initialState: GuitarProcess = {
  activPage: 1,
};

export const guitarProcess = createSlice({
  name: NameSpace.Guitar,
  initialState,
  reducers: {
    changeActivPage: (state, action) => {
      state.activPage = action.payload;
    },
  },
});

export const {changeActivPage} = guitarProcess.actions;
