import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { makeFakeGuitar } from '../../mocks/mocks';
import HistoryRouter from '../history-route/history-route';
import FormFilters from './form-filters';

const mockStore = configureMockStore();
const guitars = [makeFakeGuitar(), makeFakeGuitar()];

describe('Component: FormFilters', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: {
        cheapestGuitar: guitars,
        expensiveGuitar: guitars,
      },
      GUITAR: {activPage: 1},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FormFilters/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
    expect(screen.getByText(/Минимальная цена/i)).toBeInTheDocument();
    expect(screen.getByText(/Максимальная цена/i)).toBeInTheDocument();
  });
});
