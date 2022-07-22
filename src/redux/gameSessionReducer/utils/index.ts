import { RCompose } from '../../models';
import { Card, DeckOfCard, SuitOfCard } from '../models';
import * as R from 'ramda';

export const shuffleTheDeck = (
  cardsTemplate: DeckOfCard,
): {
  shuffledDeck: DeckOfCard;
  firstUserCard: DeckOfCard;
  secondUserCard: DeckOfCard;
  trump: SuitOfCard;
} => {
  const shuffledDeck = cardsTemplate.sort(() => Math.random() - 0.5);
  const usersCard = shuffledDeck.splice(-12).reduce(
    (acc, elem, index) => {
      if (index % 2 === 0) {
        acc.secondUserCard.push(elem);
      } else {
        acc.firstUserCard.push(elem);
      }
      return acc;
    },
    { firstUserCard: [], secondUserCard: [] } as {
      firstUserCard: Card[];
      secondUserCard: Card[];
    },
  );

  const randomCardNumber = Math.floor(
    Math.random() * (shuffledDeck.length - 1),
  );
  const trump = shuffledDeck[randomCardNumber];
  shuffledDeck.splice(randomCardNumber, 1);
  shuffledDeck.unshift(trump);

  return { ...usersCard, shuffledDeck, trump: trump.suitOfCard };
};

const selectAllTrumpsFromDeck = (
  deck: DeckOfCard,
  trump: SuitOfCard,
): DeckOfCard | [] => {
  return deck.filter(card => card.suitOfCard === trump);
};

//send array of card with only one suit
const minimalRankOfCardBySuit = (deck: DeckOfCard) => {
  //MathMin!
  return deck.reduce((acc, card) => {
    if (card.rankForComparison < acc) {
      acc = card.rankForComparison;
    }
    return acc;
  }, 999);
};

type User = {
  name: string;
  cards: DeckOfCard;
  hisTurn: boolean;
};

export const defineFirstUser = (
  users: { [key: string]: User },
  trump: SuitOfCard,
): { [key: string]: User } => {
  const usersTrumps = Object.keys(users).reduce((acc, userName) => {
    acc[userName] = selectAllTrumpsFromDeck(users[userName].cards, trump);
    return acc;
  }, {} as { [key: string]: DeckOfCard });

  if (
    Object.keys(usersTrumps).every(userName => !usersTrumps[userName].length)
  ) {
    const userNames = Object.keys(usersTrumps);
    const randomUserName =
      userNames[Math.floor(Math.random() * userNames.length)];

    return RCompose<{ [key: string]: User }>(
      R.assocPath([randomUserName, 'hisTurn'], true),
    )(users);
  }
  const { userNameWithMinimalTrump } = Object.keys(usersTrumps).reduce(
    (acc, userName) => {
      const minRankOfTrumpForCurrentUser = minimalRankOfCardBySuit(
        usersTrumps[userName],
      );

      if (minRankOfTrumpForCurrentUser < acc.minRankOfTrump) {
        return {
          userNameWithMinimalTrump: userName,
          minRankOfTrump: minRankOfTrumpForCurrentUser,
        };
      }
      return acc;
    },
    { userNameWithMinimalTrump: '', minRankOfTrump: 999 },
  );

  return RCompose<{ [key: string]: User }>(
    R.assocPath([userNameWithMinimalTrump, 'hisTurn'], true),
  )(users);
};
