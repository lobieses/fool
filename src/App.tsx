import React from 'react';
import './App.css';
import { SelectingNames } from './modules/selectingNames/container/selectingNamesContainer';
import { Provider } from 'react-redux';
import store from './redux/store';
import { useSelector } from 'react-redux';
import { hasUsernames } from './redux/initialReducer/initialReducer';
import { Game } from './modules/gameField/container/gameFieldContainer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <Router />
      </DndProvider>
    </Provider>
  );
}

const Router = () => {
  const needToSelectName = useSelector(hasUsernames);

  return <>{needToSelectName ? <Game /> : <SelectingNames />}</>;
};

export default App;
