import { Selector as ReduxSelector } from 'reselect';
import { GlobalStateType } from './store';
import * as R from 'ramda';

export type Action = {
  error?: any;
  meta?: any;
  payload?: any;
  type: string;
};

export type Selector<T> = ReduxSelector<GlobalStateType, T>;

export const RCompose = <T>(...fns: any[]) => {
  return (state: T): T => {
    //@ts-expect-error
    return R.compose<any, T>(...fns)(state);
  };
};
