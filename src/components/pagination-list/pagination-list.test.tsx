import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import PaginationList from './pagination-list';

const mockStore = configureMockStore();

describe('Component: PaginationList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    const store = mockStore({
      DATA: {countGuitars: 5},
      GUITAR: {activPage: 1},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PaginationList />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/1/i)).toBeInTheDocument();
  });
});
