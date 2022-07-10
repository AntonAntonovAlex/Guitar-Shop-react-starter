import { makeFakeGuitar, makeFakeReviews } from '../../mocks/mocks';
import { changeLoadingGuitarsStatus, guitarData, loadCountGuitars, loadGuitar, loadGuitars } from './guitar-data';

const guitars = [makeFakeGuitar(), makeFakeGuitar()];
const guitar = makeFakeGuitar();
const reviews = [makeFakeReviews(), makeFakeReviews()];

describe('Reducer: guitarData', () => {
  it('without additional parameters should return initial state', () => {
    expect(guitarData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        guitars: [],
        isDataLoaded: false,
        guitar: null,
        reviews: [],
        countGuitars: 0,
        similarGuitars: [],
        expensiveGuitar: [],
        cheapestGuitar: [],
        isLoadingGuitars: true});
  });

  it('should update guitars by load guitars', () => {
    const state = {
      guitars: [],
      isDataLoaded: false,
      guitar: null,
      reviews: [],
      countGuitars: 0,
      similarGuitars: [],
      expensiveGuitar: [],
      cheapestGuitar: [],
      isLoadingGuitars: true};
    expect(guitarData.reducer(state, loadGuitars(guitars)))
      .toEqual({
        guitars: guitars,
        isDataLoaded: true,
        guitar: null,
        reviews: [],
        countGuitars: 0,
        similarGuitars: [],
        expensiveGuitar: [],
        cheapestGuitar: [],
        isLoadingGuitars: false});
  });

  it('should update guitar&reviews by load guitar&reviews', () => {
    const state = {
      guitars: [],
      isDataLoaded: false,
      guitar: null,
      reviews: [],
      countGuitars: 0,
      similarGuitars: [],
      expensiveGuitar: [],
      cheapestGuitar: [],
      isLoadingGuitars: true};
    expect(guitarData.reducer(state, loadGuitar({guitar, reviews})))
      .toEqual({
        guitars: [],
        isDataLoaded: false,
        guitar: guitar,
        reviews: reviews,
        countGuitars: 0,
        similarGuitars: [],
        expensiveGuitar: [],
        cheapestGuitar: [],
        isLoadingGuitars: false});
  });

  it('should update countGuitars by load countGuitars', () => {
    const state = {
      guitars: [],
      isDataLoaded: false,
      guitar: null,
      reviews: [],
      countGuitars: 0,
      similarGuitars: [],
      expensiveGuitar: [],
      cheapestGuitar: [],
      isLoadingGuitars: true};
    expect(guitarData.reducer(state, loadCountGuitars(10)))
      .toEqual({
        guitars: [],
        isDataLoaded: false,
        guitar: null,
        reviews: [],
        countGuitars: 10,
        similarGuitars: [],
        expensiveGuitar: [],
        cheapestGuitar: [],
        isLoadingGuitars: true});
  });

  it('should update isLoadingGuitars by change LoadingGuitars Status', () => {
    const state = {
      guitars: [],
      isDataLoaded: false,
      guitar: null,
      reviews: [],
      countGuitars: 0,
      similarGuitars: [],
      expensiveGuitar: [],
      cheapestGuitar: [],
      isLoadingGuitars: true};
    expect(guitarData.reducer(state, changeLoadingGuitarsStatus(false)))
      .toEqual({
        guitars: [],
        isDataLoaded: false,
        guitar: null,
        reviews: [],
        countGuitars: 0,
        similarGuitars: [],
        expensiveGuitar: [],
        cheapestGuitar: [],
        isLoadingGuitars: false});
  });

});
