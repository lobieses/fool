import * as React from 'react';
import styled from 'styled-components';
import { Card } from './Card';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFirstUser,
  getGameField,
} from '../../../redux/gameSessionReducer/gameSessionReducer';
import { takeCards } from '../../../redux/gameSessionReducer/gameSessionReducerAction';

export const MyCards = () => {
  const dispatch = useDispatch();
  const firstUser = useSelector(getFirstUser);
  const gameField = useSelector(getGameField);

  return (
    <MyCardsContainer>
      {!firstUser.hisTurn && gameField && gameField.length && (
        <GameButtons>
          <TakeButton
            onClick={() => {
              dispatch(takeCards({ userName: firstUser.name || '' }));
            }}
          >
            Take
          </TakeButton>
        </GameButtons>
      )}
      <CardsContainer>
        {firstUser.cards &&
          firstUser.cards.map(card => {
            return (
              <Card
                suitOfCard={card.suitOfCard}
                rank={card.rank}
                rankForComparison={card.rankForComparison}
                userName={firstUser.name || ''}
                key={card.suitOfCard + card.rank}
              />
            );
          })}
      </CardsContainer>
    </MyCardsContainer>
  );
};

const TakeButton = styled.button`
  position: absolute;
  border: none;
  width: 100px;
  height: 40px;
  left: 5px;
  bottom: 0;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #c7c7c7;
  cursor: pointer;
`;

const GameButtons = styled.div``;

const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100%;
`;

const MyCardsContainer = styled.div`
  position: relative;
  height: 100%;
`;
