import React from 'react';
import './App.css';
import { InitialGame } from './modules/initialGame/container/initialGame';
import { Provider } from 'react-redux';
import store from './redux/store';
import { useSelector } from 'react-redux';
import { isInitGame } from './redux/initialReducer/initialReducer';

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

const Router = () => {
  const isInitialGame = useSelector(isInitGame);

  return <>{isInitialGame ? <InitialGame /> : <div></div>}</>;
};

export default App;
