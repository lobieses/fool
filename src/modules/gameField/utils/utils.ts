import { SuitOfCard } from '../../../redux/gameSessionReducer/models';

export const canBeat = (
  rankForComparisonOfMovedCard: number,
  suitOfMovedCard: SuitOfCard,
  rankForComparisonOfDroppedCard: number,
  suitOfDroppedCard: SuitOfCard,
  trump: SuitOfCard,
): boolean => {
  if (suitOfMovedCard !== trump) {
    return (
      (suitOfMovedCard === suitOfDroppedCard &&
        rankForComparisonOfMovedCard < rankForComparisonOfDroppedCard) ||
      suitOfDroppedCard === trump
    );
  } else {
    return (
      suitOfDroppedCard === trump &&
      rankForComparisonOfMovedCard < rankForComparisonOfDroppedCard
    );
  }
};
