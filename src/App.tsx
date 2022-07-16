import React from 'react';
import './App.css';
import { SelectingNames } from './modules/selectingNames/container/selectingNamesContainer';
import { Provider } from 'react-redux';
import store from './redux/store';
import { useSelector } from 'react-redux';
import { hasUsernames } from './redux/initialReducer/initialReducer';
import { GameFieldContainer } from './modules/gameField/container/gameFieldContainer';

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

const Router = () => {
  const needToSelectName = useSelector(hasUsernames);

  return <>{needToSelectName ? <GameFieldContainer /> : <SelectingNames />}</>;
};

export default App;
