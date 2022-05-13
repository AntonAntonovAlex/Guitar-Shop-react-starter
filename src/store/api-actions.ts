import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { errorHandle } from '../services/error-handle';
import { Guitar } from '../types/guitar';
import { Review } from '../types/review';
import { AppDispatch, State } from '../types/state';
import { loadGuitars, loadGuitar } from './guitar-data/guitar-data';

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

export const fetchGuitarAction = createAsyncThunk<void, number, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'fetchGuitar',
    async (id, {dispatch, extra: api}) => {
      try {
        const {data: guitar} = await api.get<Guitar>(`${APIRoute.Guitars}/${id}`);
        const {data: reviews} = await api.get<Review[]>(`${APIRoute.Guitars}/${id}/comments`);
        dispatch(loadGuitar({guitar, reviews}));
      } catch (error) {
        errorHandle(error);
      }
    },
  );
