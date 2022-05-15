import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, COUNT_GUITAR_CARD_IN_PAGE } from '../const';
import { errorHandle } from '../services/error-handle';
import { Guitar } from '../types/guitar';
import { Review } from '../types/review';
import { AppDispatch, State } from '../types/state';
import { loadGuitars, loadGuitar, loadCountGuitars } from './guitar-data/guitar-data';

export const fetchGuitarsAction = createAsyncThunk<void, number, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'fetchGuitars',
    async (id, {dispatch, extra: api}) => {
      try {
        //const {data} = await api.get<Guitar[]>(`${APIRoute.Guitars}?_start=0&_limit=9`);
        const response = await api.get(`${APIRoute.Guitars}?_start=${(id-1)*9}&_limit=${COUNT_GUITAR_CARD_IN_PAGE}`);
        dispatch(loadGuitars(response.data));
        dispatch(loadCountGuitars(response.headers['x-total-count']));
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
