import * as React from 'react';
import styled from 'styled-components';
import { Card } from './Card';
import { useSelector } from 'react-redux';
import { getShuffledDeck } from '../../../redux/gameSessionReducer/gameSessionReducer';
import { InvertedCard } from './InvertedCard';

export const Deck = () => {
  const deck = useSelector(getShuffledDeck);
  const lastCard = deck && deck[0];

  return (
    <DeckContainer>
      {lastCard && (
        <>
          <CardCounter>{deck?.length}</CardCounter>
          <Sdsd marginLeft={70}>
            <Card
              suitOfCard={lastCard.suitOfCard}
              rank={lastCard.rank}
              rankForComparison={lastCard.rankForComparison}
              rotate={90}
              canDrag={false}
            />
          </Sdsd>
          <CardsContainer>
            <Sdsd>
              <InvertedCard />
            </Sdsd>
          </CardsContainer>
        </>
      )}
    </DeckContainer>
  );
};

const DeckContainer = styled.div`
  position: relative;
`;

const CardCounter = styled.div`
  font-size: 20px;
  color: white;
`;

const Sdsd = styled.div<any>`
  top: 20%;
  position: absolute;
  transform: rotate(90);
  ${({ marginLeft }) => marginLeft && `margin-left: ${marginLeft}px`};
`;

const CardsContainer = styled.div``;
