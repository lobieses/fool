import { Action } from '../models';

export const namespace = 'GAME_SESSION';

export const START_GAME = `${namespace}/START_GAME`;
export const SET_NAMES = `${namespace}/SET_NAMES`;

type startGameAC = () => Action;

export const startGame: startGameAC = () => ({
  type: START_GAME,
});

type setNamesAC = (payload: {
  firstName: string;
  secondName: string;
}) => Action;

export const setNames: setNamesAC = payload => ({
  type: SET_NAMES,
  payload,
});
