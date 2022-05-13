import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Footer from '../footer/footer';
import Header from '../header/header';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <header className="header">
          <Link to={AppRoute.Main} className="page-content__title title title--bigger">404 Not Found</Link>
        </header>
      </main>
      <Footer />
    </div>
  );
}

export default NotFoundScreen;
