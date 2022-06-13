import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import ShowMoreButton from './show-more-button';

const mockStore = configureMockStore();

describe('Component: ShowMoreButton', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <ShowMoreButton />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Показать еще отзывы/i)).toBeInTheDocument();
  });
});
