import * as React from 'react';
import styled from 'styled-components';
import { Card } from './Card';
import { useSelector } from 'react-redux';
import { getShuffledDeck } from '../../../redux/gameSessionReducer/gameSessionReducer';
import { InvertedCard } from './InvertedCard';
import { cardHeight } from '../models/models';

export const Deck = () => {
  const deck = useSelector(getShuffledDeck);
  const lastCard = deck && deck[0];

  return (
    <DeckContainer>
      {lastCard && (
        <Cards>
          <CardCounter>{deck?.length}</CardCounter>
          <CardContainer marginLeft={70} rotate={90}>
            <Card
              suitOfCard={lastCard.suitOfCard}
              rank={lastCard.rank}
              rankForComparison={lastCard.rankForComparison}
              canDrag={false}
            />
          </CardContainer>
          <CardContainer>
            <InvertedCard />
          </CardContainer>
        </Cards>
      )}
    </DeckContainer>
  );
};

const DeckContainer = styled.div`
  height: 100%;
  position: relative;
`;

const Cards = styled.div`
  position: absolute;
  top: calc(50% - ${cardHeight / 2}px);
`;

const CardCounter = styled.div`
  position: absolute;
  top: -25px;
  font-size: 20px;
  color: #c7c7c7;
`;

const CardContainer = styled.div<any>`
  position: absolute;
  ${({ marginLeft }) => marginLeft && `margin-left: ${marginLeft}px`};
  ${({ rotate }) => rotate && `transform: rotate(${rotate}deg)`};
`;
