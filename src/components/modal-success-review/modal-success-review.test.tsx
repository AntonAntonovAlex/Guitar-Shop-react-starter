import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import ModalSuccessReview from './modal-success-review';
import { makeFakeGuitar } from '../../mocks/mocks';

const mockStore = configureMockStore();
const guitar = makeFakeGuitar();

describe('Component: ModalSuccessReview', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: {guitar: guitar},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalSuccessReview
            onEventsetShowModalSuccessReview={jest.fn()}
          />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Спасибо за ваш отзыв!/i)).toBeInTheDocument();
  });
});
