import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import GuitarCharacteristics from './guitar-characteristics';

describe('Component: GuitarCharacteristics', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <GuitarCharacteristics/>
      </HistoryRouter>,
    );

    expect(screen.getByText(/Количество струн:/i)).toBeInTheDocument();
  });
});
