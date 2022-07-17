import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import { makeFakeGuitar } from '../../mocks/mocks';
import CartScreen from './cart-screen';

const mockStore = configureMockStore();
const guitar = makeFakeGuitar();
const guitars = [makeFakeGuitar(), makeFakeGuitar()];

describe('Component: CartScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    const store = mockStore({
      GUITAR: {guitarsCart: {1: {...guitar, count: 1}}},
      DATA: {
        similarGuitars: guitars,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CartScreen/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Промокод на скидку/i)).toBeInTheDocument();
    expect(screen.getByText(/Оформить заказ/i)).toBeInTheDocument();
  });
});
