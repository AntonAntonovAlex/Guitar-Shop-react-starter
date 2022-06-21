import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import Reviews from './reviews';
import { makeFakeReviews } from '../../mocks/mocks';

const mockStore = configureMockStore();
const reviews = [makeFakeReviews(), makeFakeReviews()];

describe('Component: Reviews', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    const store = mockStore({
      DATA: {reviews: reviews},
      GUITAR: {countReviews: 3},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Reviews onEventShowModalReviewCallback={jest.fn()}/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
  });
});
