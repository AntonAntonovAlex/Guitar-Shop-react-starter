import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import { Provider } from 'react-redux';
import { makeFakeGuitar } from '../../mocks/mocks';
import HistoryRouter from '../history-route/history-route';
import NotFoundScreen from './not-found-screen';

const mockStore = configureMockStore();
const guitars = [makeFakeGuitar(), makeFakeGuitar()];
const guitar = makeFakeGuitar();

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: {similarGuitars: guitars},
      GUITAR: {guitarsCart: {1: {...guitar, count: 1}}},
    });


    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <NotFoundScreen />
        </HistoryRouter>
      </Provider>,
    );

    const headerElement = screen.getByText('404 Not Found');

    expect(headerElement).toBeInTheDocument();
  });
});

