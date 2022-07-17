import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import { makeFakeGuitar } from '../../mocks/mocks';
import CartItem from './cart-item';

const mockStore = configureMockStore();
const guitar = makeFakeGuitar();

describe('Component: CartItem', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    const store = mockStore({
      GUITAR: {guitarsCart: {1: {...guitar, count: 1}}},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CartItem
            guitarId={1}
            onEventShowModalDelete={jest.fn()}
          />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Артикул/i)).toBeInTheDocument();
    expect(screen.getByText(/струнная/i)).toBeInTheDocument();
  });
});
