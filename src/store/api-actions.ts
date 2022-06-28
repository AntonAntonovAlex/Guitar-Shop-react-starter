import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, COUNT_GUITAR_CARD_IN_PAGE } from '../const';
import { errorHandle } from '../services/error-handle';
import { Guitar } from '../types/guitar';
import { Review } from '../types/review';
import { ReviewData } from '../types/review-data';
import { AppDispatch, State } from '../types/state';
import { loadGuitars, loadGuitar, loadCountGuitars, loadSimilarGuitars } from './guitar-data/guitar-data';

export const fetchGuitarsAction = createAsyncThunk<void, number, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'DATA/loadGuitars',
    async (id, {dispatch, extra: api}) => {
      try {
        const response = await api.get(`${APIRoute.Guitars}?_start=${(id-1)*9}&_limit=${COUNT_GUITAR_CARD_IN_PAGE}&_embed=comments`);
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
    'DATA/loadGuitar',
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

export const sendReviewAction = createAsyncThunk<void, ReviewData, {
    state: State,
    extra: AxiosInstance
  }>(
    'DATA/review',
    async ({guitarId, userName, advantage, disadvantage, comment, rating, closeModalReviewCallback, showModalSuccessReview}, {extra: api}) => {
      try {
        await api.post<ReviewData>(APIRoute.Comments, {guitarId, userName, advantage, disadvantage, comment, rating});
        closeModalReviewCallback();
        showModalSuccessReview();
      } catch (error) {
        errorHandle(error);
      }
    },
  );

export const fetchSimilarGuitarsAction = createAsyncThunk<void, string, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'DATA/loadSimilarGuitars',
    async (name, {dispatch, extra: api}) => {
      try {
        const response = await api.get(`${APIRoute.Guitars}?name_like=${name}`);
        dispatch(loadSimilarGuitars(response.data));
      } catch (error) {
        errorHandle(error);
      }
    },
  );
