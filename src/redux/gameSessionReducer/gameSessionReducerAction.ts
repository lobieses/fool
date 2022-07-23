import { Action } from '../models';
import { Card, MovedCardInfo, Rank, SuitOfCard } from './models';

export const namespace = 'GAME_SESSION';

export const START_GAME = `${namespace}/START_GAME`;
export const SET_NAMES = `${namespace}/SET_NAMES`;
export const MAKE_CARD_MOVE = `${namespace}/MAKE_CARD_MOVE`;
export const BEAT_THE_MOVED_CARD = `${namespace}/BEAT_THE_MOVED_CARD`;
export const TAKE_CARDS = `${namespace}/TAKE_CARDS`;

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

type beatTheMovedCardAC = (payload: {
  movedCardRank: Rank;
  movedSuitOfCard: SuitOfCard;
  beatCard: Card;
}) => Action;

export const beatTheMovedCard: beatTheMovedCardAC = payload => ({
  type: BEAT_THE_MOVED_CARD,
  payload,
});

type takeCardsAC = (payload: { userName: string }) => Action;

export const takeCards: takeCardsAC = payload => ({
  type: TAKE_CARDS,
  payload,
});
