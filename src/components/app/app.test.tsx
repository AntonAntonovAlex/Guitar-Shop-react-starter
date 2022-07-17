import {render, screen} from '@testing-library/react';
import App from './app';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import { AppRoute } from '../../const';
import { makeFakeGuitar } from '../../mocks/mocks';

const mockStore = configureMockStore();
const guitars = [makeFakeGuitar(), makeFakeGuitar()];
const guitar = makeFakeGuitar();

const store = mockStore({
  DATA: {
    isDataLoaded: true,
    guitars: guitars,
    similarGuitars: guitars,
    expensiveGuitar: guitars,
    cheapestGuitar: guitars,
  },
  GUITAR: {activPage: 1, guitarsCart: {1: {...guitar, count: 1}}},
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "MainScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText('Каталог гитар')).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });
});

