import * as R from 'ramda';
import { createSelector } from 'reselect';
import { Action, RCompose, Selector } from '../models';
import { GlobalStateType } from '../store';
import { FINISH_NAMES_SELECTING } from './initialReducerActions';

type initialGameStateTypes = {
  hasUsernames: boolean;
};

let initialGameState: initialGameStateTypes = {
  hasUsernames: true,
};

const STATE_KEY = 'initialGameReducer';

const initialGameReducer = (
  state = initialGameState,
  action: Action,
): initialGameStateTypes => {
  switch (action.type) {
    case FINISH_NAMES_SELECTING: {
      return RCompose<initialGameStateTypes>(
        R.assocPath(['hasUsernames'], true),
      )(state);
    }
    default:
      return state;
  }
};

export const getState = (state: GlobalStateType) => state[STATE_KEY];

export const hasUsernames: Selector<boolean> = createSelector(
  getState,
  state => {
    return state.hasUsernames;
  },
);

export default initialGameReducer;
