import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import ModalAddSuccess from './modal-add-success';

describe('Component: ModalAddSuccess', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const mockStore = configureMockStore();
    const store = mockStore();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalAddSuccess
            onEventShowModalAddSuccess={jest.fn()}
            isGuitarScreen={false}
          />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Товар успешно добавлен в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Перейти в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Продолжить покупки/i)).toBeInTheDocument();
  });
});
