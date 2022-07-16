import { Action } from '../models';

export const namespace = 'INITIAL_GAME';

export const FINISH_NAMES_SELECTING = `${namespace}/FINISH_NAMES_SELECTING`;

type finishNamesSelectingAC = () => Action;

export const finishNamesSelecting: finishNamesSelectingAC = () => ({
  type: FINISH_NAMES_SELECTING,
});
