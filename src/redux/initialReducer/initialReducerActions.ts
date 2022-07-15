import { Action } from '../models';

export const namespace = 'INITIAL_GAME';

export const FINISH_NAMES_SELECTING = `${namespace}/FINISH_NAMES_SELECTING`;

type finishNamesSelectingAC = (payload: {
  firstName: string;
  secondName: string;
}) => Action;

export const finishNamesSelecting: finishNamesSelectingAC = payload => ({
  type: FINISH_NAMES_SELECTING,
  payload,
});
