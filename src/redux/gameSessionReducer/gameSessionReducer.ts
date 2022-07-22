import * as R from 'ramda';
import { createSelector } from 'reselect';
import { Action, RCompose, Selector } from '../models';
import { GlobalStateType } from '../store';
import {
  MAKE_CARD_MOVE,
  SET_NAMES,
  START_GAME,
} from './gameSessionReducerAction';
import { initialGameStateTypes, deckOfCard, DeckOfCard, User } from './models';
import { defineFirstUser, shuffleTheDeck } from './utils';

let initialGameState: initialGameStateTypes = {
  usersIsReady: false,
  shuffledDeck: null,
  users: {
    you: { name: 'you', cards: null, hisTurn: false },
    enemy: { name: 'enemy', cards: null, hisTurn: false },
  },
  trump: null,
  gameField: null,
};

const STATE_KEY = 'gameSessionReducer';

const gameSessionReducer = (
  state = initialGameState,
  action: Action,
): initialGameStateTypes => {
  switch (action.type) {
    case START_GAME: {
      const { shuffledDeck, firstUserCard, secondUserCard, trump } =
        shuffleTheDeck(deckOfCard);

      const [firstUserName, secondUserName] = Object.keys(state.users);

      const usersWithCards = RCompose<{ [key: string]: User }>(
        R.assocPath([firstUserName, 'cards'], firstUserCard),
        R.assocPath([secondUserName, 'cards'], secondUserCard),
      )(state.users);

      //@ts-expect-error
      const users = defineFirstUser(usersWithCards, trump);

      return RCompose<initialGameStateTypes>(
        R.assocPath(['usersIsReady'], true),
        R.assocPath(['shuffledDeck'], shuffledDeck),
        R.assocPath(['users'], users),
        R.assocPath(['trump'], trump),
      )(state);
    }
    case SET_NAMES: {
      const { firstName, secondName } = action.payload;
      return RCompose<initialGameStateTypes>(
        R.assocPath(['firstUser', 'name'], firstName),
        R.assocPath(['secondUser', 'name'], secondName),
      )(state);
    }

    case MAKE_CARD_MOVE: {
      const { suitOfCard, rank, rankForComparison, userName } = action.payload;
      const userCards = state.users[userName].cards;
      if (!userCards) return state;

      const newUserCards = [...userCards];
      const indexOfCurrentCard = newUserCards.findIndex(
        card => card.suitOfCard === suitOfCard && card.rank === rank,
      );
      const newCardsForGameField = [
        ...(state.gameField || []),
        ...newUserCards.splice(indexOfCurrentCard, 1),
      ];

      return RCompose<initialGameStateTypes>(
        R.assocPath(['users', userName, 'cards'], newUserCards),
        R.assocPath(['gameField'], newCardsForGameField),
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

export const getWalkingPlayer: Selector<string> = createSelector(
  getState,
  state => {
    Object.keys(state.users).forEach(userName => {
      if (state.users[userName].hisTurn) {
        return state.users[userName].name;
      }
    });
    return '';
  },
);

export const getFirstUser: Selector<User> = createSelector(getState, state => {
  return state.users[Object.keys(state.users)[0]];
});

export const getSecondUser: Selector<User> = createSelector(getState, state => {
  return state.users[Object.keys(state.users)[1]];
});

export const getGameField: Selector<DeckOfCard | null> = createSelector(
  getState,
  state => {
    return state.gameField;
  },
);

export default gameSessionReducer;
