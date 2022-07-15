import { Selector as ReduxSelector } from 'reselect';
import { GlobalStateType } from './store';

export type Action = {
  error?: any;
  meta?: any;
  payload?: any;
  type: string;
};

export type Selector<T> = ReduxSelector<GlobalStateType, T>;
