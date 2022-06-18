import { Link } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <header className="header">
          <p className="page-content__title title title--bigger">404 Not Found</p>
          <p>
            <Link to='/' className="page-content__title title title--bigger">На главную</Link>
          </p>
        </header>
      </main>
      <Footer />
    </div>
  );
}

export default NotFoundScreen;
