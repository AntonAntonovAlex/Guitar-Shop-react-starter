import { Navigate, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { getLoadedDataStatus } from '../../store/guitar-data/selectors';
import CartScreen from '../cart-screen/cart-screen';
import GuitarCharacteristics from '../guitar-characteristics/guitar-characteristics';
import GuitarDescription from '../guitar-description/guitar-description';
import GuitarScreen from '../guitar-screen/guitar-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import MainScreen from '../main-screen/main-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';

function App(): JSX.Element {
  const isDataLoaded = useAppSelector(getLoadedDataStatus);

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <Routes>
      <Route path="/"
        element={<Navigate to="/catalog/page_1" replace />}
      />
      <Route
        path={AppRoute.Main}
        element={<MainScreen/>}
      />
      <Route
        path={AppRoute.NotFoundScreen}
        element={<NotFoundScreen/>}
      />
      <Route path={AppRoute.Guitars} element={<GuitarScreen/>}>
        <Route path="characteristics" element={<GuitarCharacteristics />} />
        <Route path="description" element={<GuitarDescription />} />
      </Route>
      <Route
        path={AppRoute.Cart}
        element={<CartScreen/>}
      />
    </Routes>
  );
}

export default App;
