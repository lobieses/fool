export type User = {
  name: string | null;
  cards: DeckOfCard | null;
  hisTurn: boolean;
};

export type SuitOfCard = 'spade' | 'heart' | 'diamond' | 'club';
export type Rank = '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'T';

export type Card = {
  suitOfCard: SuitOfCard;
  rank: Rank;
  rankForComparison: number;
};

export type MovedCardInfo = {
  suitOfCard: string;
  rank: string;
  rankForComparison: number;
  userName: string;
};

export type DeckOfCard = Card[];

export type initialGameStateTypes = {
  usersIsReady: boolean;
  shuffledDeck: DeckOfCard | null;
  users: { [key: string]: User };
  trump: string | null;
  gameField: DeckOfCard | null;
};

export const deckOfCard: DeckOfCard = [
  {
    suitOfCard: 'spade',
    rank: '6',
    rankForComparison: 1,
  },

  {
    suitOfCard: 'heart',
    rank: '6',
    rankForComparison: 1,
  },

  {
    suitOfCard: 'diamond',
    rank: '6',
    rankForComparison: 1,
  },

  {
    suitOfCard: 'club',
    rank: '6',
    rankForComparison: 1,
  },

  {
    suitOfCard: 'spade',
    rank: '7',
    rankForComparison: 2,
  },

  {
    suitOfCard: 'heart',
    rank: '7',
    rankForComparison: 2,
  },

  {
    suitOfCard: 'diamond',
    rank: '7',
    rankForComparison: 2,
  },

  {
    suitOfCard: 'club',
    rank: '7',
    rankForComparison: 2,
  },

  {
    suitOfCard: 'spade',
    rank: '8',
    rankForComparison: 3,
  },

  {
    suitOfCard: 'heart',
    rank: '8',
    rankForComparison: 3,
  },

  {
    suitOfCard: 'diamond',
    rank: '8',
    rankForComparison: 3,
  },

  {
    suitOfCard: 'club',
    rank: '8',
    rankForComparison: 3,
  },

  {
    suitOfCard: 'spade',
    rank: '9',
    rankForComparison: 4,
  },

  {
    suitOfCard: 'heart',
    rank: '9',
    rankForComparison: 4,
  },

  {
    suitOfCard: 'diamond',
    rank: '9',
    rankForComparison: 4,
  },

  {
    suitOfCard: 'club',
    rank: '9',
    rankForComparison: 4,
  },

  {
    suitOfCard: 'spade',
    rank: '10',
    rankForComparison: 5,
  },

  {
    suitOfCard: 'heart',
    rank: '10',
    rankForComparison: 5,
  },

  {
    suitOfCard: 'diamond',
    rank: '10',
    rankForComparison: 5,
  },

  {
    suitOfCard: 'club',
    rank: '10',
    rankForComparison: 5,
  },

  {
    suitOfCard: 'spade',
    rank: 'J',
    rankForComparison: 6,
  },

  {
    suitOfCard: 'heart',
    rank: 'J',
    rankForComparison: 6,
  },

  {
    suitOfCard: 'diamond',
    rank: 'J',
    rankForComparison: 6,
  },

  {
    suitOfCard: 'club',
    rank: 'J',
    rankForComparison: 6,
  },

  {
    suitOfCard: 'spade',
    rank: 'Q',
    rankForComparison: 7,
  },

  {
    suitOfCard: 'heart',
    rank: 'Q',
    rankForComparison: 7,
  },

  {
    suitOfCard: 'diamond',
    rank: 'Q',
    rankForComparison: 7,
  },

  {
    suitOfCard: 'club',
    rank: 'Q',
    rankForComparison: 7,
  },

  {
    suitOfCard: 'spade',
    rank: 'K',
    rankForComparison: 8,
  },

  {
    suitOfCard: 'heart',
    rank: 'K',
    rankForComparison: 8,
  },

  {
    suitOfCard: 'diamond',
    rank: 'K',
    rankForComparison: 8,
  },

  {
    suitOfCard: 'club',
    rank: 'K',
    rankForComparison: 8,
  },

  {
    suitOfCard: 'spade',
    rank: 'T',
    rankForComparison: 9,
  },

  {
    suitOfCard: 'heart',
    rank: 'T',
    rankForComparison: 9,
  },

  {
    suitOfCard: 'diamond',
    rank: 'T',
    rankForComparison: 9,
  },

  {
    suitOfCard: 'club',
    rank: 'T',
    rankForComparison: 9,
  },
];
