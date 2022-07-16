import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import { makeFakeGuitar } from '../../mocks/mocks';
import HistoryRouter from '../history-route/history-route';
import GuitarCard from './guitar-card';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    const fakeGuitar = makeFakeGuitar();

    render(
      <HistoryRouter history={history}>
        <GuitarCard guitar={fakeGuitar} onEventShowModalAddCartCallback={jest.fn()}/>
      </HistoryRouter>,
    );

    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
    expect(screen.getByText(/Купить/i)).toBeInTheDocument();
  });
});
