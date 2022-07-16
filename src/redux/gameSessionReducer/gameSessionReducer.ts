import * as R from 'ramda';
import { createSelector } from 'reselect';
import { Action, Card, deckOfCard, DeckOfCard, Selector } from '../models';
import { GlobalStateType } from '../store';
import { SET_NAMES, START_GAME } from './gameSessionReducerAction';
import { shuffleTheDeck } from './utils';

type initialGameStateTypes = {
  usersIsReady: boolean;
  shuffledDeck: DeckOfCard | null;
  firstUser: { name: string | null; cards: Card[] | null };
  secondUser: { name: string | null; cards: Card[] | null };
  trump: string | null;
};

let initialGameState: initialGameStateTypes = {
  usersIsReady: false,
  shuffledDeck: null,
  firstUser: { name: '1', cards: null },
  secondUser: { name: '2', cards: null },
  trump: null,
};

const STATE_KEY = 'gameSessionReducer';

const gameSessionReducer = (
  state = initialGameState,
  action: Action,
): initialGameStateTypes => {
  switch (action.type) {
    case START_GAME: {
      const shuffledDeckInfo = shuffleTheDeck(deckOfCard);
      //@ts-expect-error
      return R.compose(
        R.assocPath(['usersIsReady'], true),
        R.assocPath(['shuffledDeck'], shuffledDeckInfo.shuffledDeck),
        R.assocPath(['firstUser', 'cards'], shuffledDeckInfo.firstUserCard),
        R.assocPath(['secondUser', 'cards'], shuffledDeckInfo.secondUserCard),
        R.assocPath(['trump'], shuffledDeckInfo.trump),
      )(state);
    }
    case SET_NAMES: {
      const { firstName, secondName } = action.payload;
      //@ts-expect-error
      return R.compose(
        R.assocPath(['firstUser', 'name'], firstName),
        R.assocPath(['secondUser', 'name'], secondName),
      )(state);
    }
    default:
      return state;
  }
};

export const getState = (state: GlobalStateType) => state[STATE_KEY];

export const usersIsReady: Selector<boolean> = createSelector(
  getState,
  state => {
    return state.usersIsReady;
  },
);

export const getShuffledDeck: Selector<DeckOfCard | null> = createSelector(
  getState,
  state => {
    return state.shuffledDeck;
  },
);

export const getFirstUser: Selector<{
  name: string | null;
  cards: Card[] | null;
}> = createSelector(getState, state => {
  return state.firstUser;
});

export const getSecondUser: Selector<{
  name: string | null;
  cards: Card[] | null;
}> = createSelector(getState, state => {
  return state.secondUser;
});

export default gameSessionReducer;
