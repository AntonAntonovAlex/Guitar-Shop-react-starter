import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { getLoadedDataStatus } from '../../store/guitar-data/selectors';
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
      <Route
        path={AppRoute.Main}
        element={<MainScreen/>}
      />
      <Route
        path={AppRoute.NotFoundScreen}
        element={<NotFoundScreen/>}
      />
    </Routes>
  );
}

export default App;
