import { Card, DeckOfCard } from '../../models';

export const shuffleTheDeck = (
  cardsTemplate: DeckOfCard,
): {
  shuffledDeck: DeckOfCard;
  firstUserCard: DeckOfCard;
  secondUserCard: DeckOfCard;
  trump: string;
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
