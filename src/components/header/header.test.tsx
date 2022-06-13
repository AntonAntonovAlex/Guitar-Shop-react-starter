import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import Header from './header';

describe('Component: Header', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Header/>
      </HistoryRouter>,
    );

    expect(screen.getByText(/Где купить/i)).toBeInTheDocument();
  });
});
