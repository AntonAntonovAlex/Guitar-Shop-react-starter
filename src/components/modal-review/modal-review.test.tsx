import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import ModalReview from './modal-review';
import { makeFakeGuitar } from '../../mocks/mocks';

const mockStore = configureMockStore();
const guitar = makeFakeGuitar();

describe('Component: ModalReview', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    const store = mockStore({
      DATA: {guitar: guitar},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalReview
            onEventShowModalReviewCallback={jest.fn()}
            onEventShowModalSuccessReview={jest.fn()}
          />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Ваше Имя/i)).toBeInTheDocument();
    expect(screen.getByText(/Ваша Оценка/i)).toBeInTheDocument();
    expect(screen.getByText(/Достоинства/i)).toBeInTheDocument();
  });
});
