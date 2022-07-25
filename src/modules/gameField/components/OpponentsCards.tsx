import * as React from 'react';
import styled from 'styled-components';
import { Card } from './Card';
import { useSelector } from 'react-redux';
import { getSecondUser } from '../../../redux/gameSessionReducer/gameSessionReducer';

export const OpponentCards = () => {
  const secondUser = useSelector(getSecondUser);

  return (
    <OpponentCardsContainer>
      {secondUser.cards &&
        secondUser.cards.map(card => {
          return (
            <Card
              suitOfCard={card.suitOfCard}
              rank={card.rank}
              rankForComparison={card.rankForComparison}
              rotate={180}
              userName={secondUser.name || ''}
              key={card.suitOfCard + card.rank}
            />
          );
        })}
    </OpponentCardsContainer>
  );
};

const OpponentCardsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100%;
`;
