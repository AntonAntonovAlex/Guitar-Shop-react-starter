import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import MainScreen from './main-screen';
import { makeFakeGuitar } from '../../mocks/mocks';

const mockStore = configureMockStore();
const guitars = [makeFakeGuitar(), makeFakeGuitar()];

describe('Component: MainScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: {
        guitars: guitars,
        similarGuitars: guitars,
        expensiveGuitar: guitars,
        cheapestGuitar: guitars,
      },
      GUITAR: {activPage: 1},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
  });
});
