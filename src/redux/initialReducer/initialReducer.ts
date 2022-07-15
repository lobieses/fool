import * as R from 'ramda';
import { createSelector } from 'reselect';
import { Action, Selector } from '../models';
import { GlobalStateType } from '../store';
import { FINISH_NAMES_SELECTING } from './initialReducerActions';

type initialGameStateTypes = {
  isInitGame: boolean;
  firstName: string | null;
  secondName: string | null;
};

let initialGameState: initialGameStateTypes = {
  isInitGame: true,
  firstName: null,
  secondName: null,
};

const STATE_KEY = 'initialGameReducer';

const initialGameReducer = (
  state = initialGameState,
  action: Action,
): initialGameStateTypes => {
  switch (action.type) {
    case FINISH_NAMES_SELECTING: {
      const { firstName, secondName } = action.payload;
      //@ts-expect-error
      return R.compose(
        R.assocPath(['firstName'], firstName),
        R.assocPath(['secondName'], secondName),
        R.assocPath(['isInitGame'], false),
      )(state);
    }
    default:
      return state;
  }
};

export const getState = (state: GlobalStateType) => state[STATE_KEY];

export const isInitGame: Selector<boolean> = createSelector(getState, state => {
  return state.isInitGame;
});

export default initialGameReducer;
