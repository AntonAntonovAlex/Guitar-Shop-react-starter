import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import { Provider } from 'react-redux';
import { makeFakeGuitar } from '../../mocks/mocks';
import HistoryRouter from '../history-route/history-route';
import GuitarCard from './guitar-card';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const mockStore = configureMockStore();

    const fakeGuitar = makeFakeGuitar();
    const guitar = makeFakeGuitar();

    const store = mockStore({
      GUITAR: {guitarsCart: {1: guitar}},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <GuitarCard guitar={fakeGuitar} onEventShowModalAddCartCallback={jest.fn()}/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
    expect(screen.getByText(/Купить/i)).toBeInTheDocument();
  });
});
