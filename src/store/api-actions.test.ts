import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import {Action} from 'redux';
import { makeFakeGuitar, makeFakeReviewData } from '../mocks/mocks';
import { APIRoute } from '../const';
import { fetchGuitarAction, fetchGuitarsAction, sendReviewAction } from './api-actions';
import { loadGuitar, loadGuitars } from './guitar-data/guitar-data';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
        State,
        Action,
        ThunkDispatch<State, typeof api, Action>
      >(middlewares);

  it('should dispatch Load_Guitars when GET /guitars', async () => {
    const guitars = [makeFakeGuitar(), makeFakeGuitar()];
    mockAPI
      .onGet(APIRoute.Guitars)
      .reply(200, guitars);

    const store = mockStore();

    await store.dispatch(fetchGuitarsAction(1));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadGuitars.toString());
  });

  it('should dispatch Load_Guitar when GET /guitar', async () => {
    const guitar = makeFakeGuitar();
    mockAPI
      .onGet(APIRoute.Guitars)
      .reply(200, guitar);

    const store = mockStore();

    await store.dispatch(fetchGuitarAction(1));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadGuitar.toString());
  });

  it('should dispatch closeModalReviewCallback and showModalSuccessReview when POST /comments', async () => {
    const reviewData = makeFakeReviewData();

    mockAPI
      .onPost(APIRoute.Comments)
      .reply(200);


    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(sendReviewAction(reviewData));

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
  });

});
