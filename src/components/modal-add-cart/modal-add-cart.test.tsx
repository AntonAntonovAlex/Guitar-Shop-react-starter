import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import { makeFakeGuitar } from '../../mocks/mocks';
import ModalAddCart from './modal-add-cart';

const mockStore = configureMockStore();
const guitar = makeFakeGuitar();
const guitars = [makeFakeGuitar(), makeFakeGuitar()];

describe('Component: ModalAddCart', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    const store = mockStore({
      DATA: {
        guitar: guitar,
        guitars: guitars,
      },
      GUITAR: {idGuitarForCart: 1},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalAddCart
            onEventShowModalAddCartCallback={jest.fn()}
            onEventShowModalAddSuccess={jest.fn()}
          />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Гитара/i)).toBeInTheDocument();
    expect(screen.getByText(/Артикул/i)).toBeInTheDocument();
  });
});
