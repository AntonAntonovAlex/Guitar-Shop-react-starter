import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import GuitarScreen from './guitar-screen';
import { makeFakeGuitar, makeFakeReviews } from '../../mocks/mocks';

const mockStore = configureMockStore();
const guitar = makeFakeGuitar();
const reviews = [makeFakeReviews(), makeFakeReviews()];
const guitars = [makeFakeGuitar(), makeFakeGuitar()];

describe('Component: GuitarScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: {
        guitar: guitar,
        reviews: reviews,
        similarGuitars: guitars,
        expensiveGuitar: guitars,
        cheapestGuitar: guitars,
      },
      GUITAR: {countReviews: 3, guitarsCart: {1: {...guitar, count: 1}}},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <GuitarScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Описание/i)).toBeInTheDocument();
    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
  });
});
