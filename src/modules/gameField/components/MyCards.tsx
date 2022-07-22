import * as React from 'react';
import styled from 'styled-components';
import { Card } from './Card';
import { useSelector } from 'react-redux';
import { getFirstUser } from '../../../redux/gameSessionReducer/gameSessionReducer';

export const MyCards = () => {
  const firstUser = useSelector(getFirstUser);

  return (
    <MyCardsContainer>
      {firstUser.cards &&
        firstUser.cards.map(card => {
          return (
            <Card
              suitOfCard={card.suitOfCard}
              rank={card.rank}
              rankForComparison={card.rankForComparison}
              userName={firstUser.name || ''}
              key={card.suitOfCard + card.rank}
              canDrag={firstUser.hisTurn}
            />
          );
        })}
    </MyCardsContainer>
  );
};

const MyCardsContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;
