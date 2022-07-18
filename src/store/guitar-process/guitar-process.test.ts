import { STEP_COUNT_REVIEWS } from '../../const';
import { changeActivPage, guitarProcess, incrementCountReviews, resetCountReviews } from './guitar-process';

describe('Reducer: guitarProcess', () => {
  it('should have resetCountReviews', () => {
    expect(guitarProcess.reducer({activPage: 1, countReviews: 15, idGuitarForCart: 0, guitarsCart: {}, cartBonus: 0}, resetCountReviews()))
      .toEqual({activPage: 1, countReviews: STEP_COUNT_REVIEWS, idGuitarForCart: 0, guitarsCart: {}, cartBonus: 0});
  });

  it('without additional parameters should return initial state', () => {
    expect(guitarProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({activPage: 1, countReviews: STEP_COUNT_REVIEWS, idGuitarForCart: 0, guitarsCart: {}, cartBonus: 0});
  });

  it('should increment current count by a given value', () => {
    const state = {activPage: 1, countReviews: STEP_COUNT_REVIEWS, idGuitarForCart: 0, guitarsCart: {}, cartBonus: 0};
    expect(guitarProcess.reducer(state, incrementCountReviews()))
      .toEqual({activPage: 1, countReviews: 6, idGuitarForCart: 0, guitarsCart: {}, cartBonus: 0});
  });

  it('should change the genre to the given value', () => {
    const state = {activPage: 1, countReviews: STEP_COUNT_REVIEWS, idGuitarForCart: 0, guitarsCart: {}, cartBonus: 0};
    expect(guitarProcess.reducer(state, changeActivPage(8)))
      .toEqual({activPage: 8, countReviews: STEP_COUNT_REVIEWS, idGuitarForCart: 0, guitarsCart: {}, cartBonus: 0});
  });

});
