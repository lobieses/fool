import * as R from 'ramda';
import { createSelector } from 'reselect';
import { Action, RCompose, Selector } from '../models';
import { GlobalStateType } from '../store';
import {
  BEAT_THE_MOVED_CARD,
  DISTRIBUTE_THE_DECK,
  MAKE_CARD_MOVE,
  SET_NAMES,
  START_GAME,
  TAKE_CARDS,
} from './gameSessionReducerAction';
import {
  initialGameStateTypes,
  deckOfCard,
  DeckOfCard,
  User,
  SuitOfCard,
  CardsOnGameField,
} from './models';
import { defineFirstUser, distributeTheDeck, shuffleTheDeck } from './utils';

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
      const { suitOfCard, rank, userName } = action.payload;
      const userCards = state.users[userName].cards;
      if (!userCards) return state;

      const newUserCards = [...userCards];
      const indexOfCurrentCard = newUserCards.findIndex(
        card => card.suitOfCard === suitOfCard && card.rank === rank,
      );
      const newGameFieldCard = {
        ...newUserCards.splice(indexOfCurrentCard, 1)[0],
        beatOfCard: null,
      };

      const newCardsForGameField = [
        ...(state.gameField || []),
        newGameFieldCard,
      ];

      return RCompose<initialGameStateTypes>(
        R.assocPath(['users', userName, 'cards'], newUserCards),
        R.assocPath(['gameField'], newCardsForGameField),
      )(state);
    }
    case BEAT_THE_MOVED_CARD: {
      const { movedSuitOfCard, movedCardRank, beatCard } = action.payload;

      if (!state.gameField) return state;

      const newCardOnGameField: CardsOnGameField = state.gameField?.map(
        card => {
          if (
            card.suitOfCard === movedSuitOfCard &&
            card.rank === movedCardRank
          ) {
            return { ...card, beatOfCard: beatCard };
          }
          return card;
        },
      );

      const nameOfProtectingUser = Object.keys(state.users).reduce(
        (acc, userName) => {
          if (!state.users[userName].hisTurn) {
            acc = state.users[userName].name;
          }
          return acc;
        },
        null as string | null,
      );

      if (!nameOfProtectingUser) return state;

      const protectingUserCards = state.users[nameOfProtectingUser].cards || [];

      const indexOfDroppedCardFromUserDeck = protectingUserCards.findIndex(
        card =>
          card.suitOfCard === beatCard.suitOfCard &&
          card.rank === beatCard.rank,
      );

      const newUserCardsWithoutDropped = [...protectingUserCards];
      newUserCardsWithoutDropped.splice(indexOfDroppedCardFromUserDeck, 1);

      return RCompose<initialGameStateTypes>(
        R.assocPath(['gameField'], newCardOnGameField),
        R.assocPath(
          ['users', nameOfProtectingUser, 'cards'],
          newUserCardsWithoutDropped,
        ),
      )(state);
    }
    case TAKE_CARDS: {
      const { userName } = action.payload;

      const cardOnGameField = state.gameField
        ? state.gameField.reduce((acc, card) => {
            const { rank, rankForComparison, suitOfCard, beatOfCard } = card;
            acc.push({ suitOfCard, rank, rankForComparison });
            if (beatOfCard) {
              acc.push(beatOfCard);
            }
            return acc;
          }, [] as DeckOfCard)
        : [];

      const newUserCards = [...(state.users[userName].cards || [])].concat(
        cardOnGameField,
      );

      return RCompose<initialGameStateTypes>(
        R.assocPath(['users', userName, 'cards'], newUserCards),
        R.assocPath(['gameField'], null),
      )(state);
    }
    case DISTRIBUTE_THE_DECK: {
      const { users, deck } = distributeTheDeck(
        [...(state.shuffledDeck || [])],
        state.users,
      );

      return RCompose<initialGameStateTypes>(
        R.assocPath(['users'], users),
        R.assocPath(['shuffledDeck'], deck),
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

export const getMovingUser: Selector<string | null> = createSelector(
  getState,
  state => {
    return Object.keys(state.users).reduce((acc, userName) => {
      if (state.users[userName].hisTurn) {
        acc = state.users[userName].name;
      }
      return acc;
    }, null as null | string);
  },
);

export const getTrump: Selector<SuitOfCard | null> = createSelector(
  getState,
  state => {
    return state.trump;
  },
);

export const getFirstUser: Selector<User> = createSelector(getState, state => {
  return state.users[Object.keys(state.users)[0]];
});

export const getSecondUser: Selector<User> = createSelector(getState, state => {
  return state.users[Object.keys(state.users)[1]];
});

export const getGameField: Selector<CardsOnGameField | null> = createSelector(
  getState,
  state => {
    return state.gameField;
  },
);

export default gameSessionReducer;
