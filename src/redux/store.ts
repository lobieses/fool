import { createStore, combineReducers, applyMiddleware } from 'redux';
import initialGameReducer from './initialReducer/initialReducer';
import loggerMiddleware from './reduxLogger';
import gameSessionReducer from './gameSessionReducer/gameSessionReducer';

let rootReducer = combineReducers({ initialGameReducer, gameSessionReducer });

let store = createStore(rootReducer, applyMiddleware(loggerMiddleware));

type RootReducerType = typeof rootReducer;
export type GlobalStateType = ReturnType<RootReducerType>;

export default store;
