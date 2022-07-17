import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import { Provider } from 'react-redux';
import { makeFakeGuitar } from '../../mocks/mocks';
import HistoryRouter from '../history-route/history-route';
import ModalDeleteCart from './modal-delete-cart';

describe('Component: ModalAddSuccess', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const mockStore = configureMockStore();
    const guitar = makeFakeGuitar();
    const store = mockStore({
      GUITAR: {guitarsCart: {1: {...guitar, count: 1}}},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalDeleteCart
            onEventShowModalDelete={jest.fn()}
            idGuitarRemoveFromCart={'1'}
          />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Удалить товар/i)).toBeInTheDocument();
    expect(screen.getByText(/Продолжить покупки/i)).toBeInTheDocument();
  });
});
