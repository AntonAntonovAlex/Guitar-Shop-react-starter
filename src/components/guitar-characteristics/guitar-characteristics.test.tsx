import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { makeFakeGuitar } from '../../mocks/mocks';
import HistoryRouter from '../history-route/history-route';
import GuitarCharacteristics from './guitar-characteristics';

const mockStore = configureMockStore();
const guitar = makeFakeGuitar();

describe('Component: GuitarCharacteristics', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    const store = mockStore({
      DATA: {guitar: guitar},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <GuitarCharacteristics/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Количество струн:/i)).toBeInTheDocument();
  });
});
