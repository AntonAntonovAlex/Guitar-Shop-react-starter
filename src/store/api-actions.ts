import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { errorHandle } from '../services/error-handle';
import { Guitar } from '../types/guitar';
import { AppDispatch, State } from '../types/state';
import { loadGuitars } from './guitar-data/guitar-data';

export const fetchGuitarsAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'fetchGuitars',
    async (_arg, {dispatch, extra: api}) => {
      try {
        const {data} = await api.get<Guitar[]>(APIRoute.Guitars);
        dispatch(loadGuitars(data));
      } catch (error) {
        errorHandle(error);
      }
    },
  );
