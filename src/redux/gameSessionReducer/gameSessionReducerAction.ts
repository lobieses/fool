import { Action } from '../models';
import { MovedCardInfo } from './models';

export const namespace = 'GAME_SESSION';

export const START_GAME = `${namespace}/START_GAME`;
export const SET_NAMES = `${namespace}/SET_NAMES`;
export const MAKE_CARD_MOVE = `${namespace}/MAKE_CARD_MOVE`;

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

type makeCardMoveAC = (payload: MovedCardInfo) => Action;

export const makeCardMove: makeCardMoveAC = payload => ({
  type: MAKE_CARD_MOVE,
  payload,
});
