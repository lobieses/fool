import * as React from 'react';
import styled from 'styled-components';
import { Card } from './Card';
import { useDispatch } from 'react-redux';
import {
  distributeTheDeck,
  takeCards,
} from '../../../redux/gameSessionReducer/gameSessionReducerAction';
import {
  CardsOnGameField,
  User,
} from '../../../redux/gameSessionReducer/models';

interface UserCardsProps {
  user: User;
  gameField: CardsOnGameField | null;
  cardsRotate?: number;
}

export const UserCards = ({
  user,
  gameField,
  cardsRotate = 0,
}: UserCardsProps) => {
  const dispatch = useDispatch();

  return (
    <MyCardsContainer>
      {!user.hisTurn && gameField && gameField.length && (
        <GameButtons>
          <TakeButton
            onClick={() => {
              dispatch(takeCards({ userName: user.name || '' }));
              dispatch(distributeTheDeck());
            }}
          >
            Take
          </TakeButton>
        </GameButtons>
      )}
      <CardsContainer>
        {user.cards &&
          user.cards.map(card => {
            return (
              <Card
                suitOfCard={card.suitOfCard}
                rank={card.rank}
                rankForComparison={card.rankForComparison}
                userName={user.name || ''}
                key={card.suitOfCard + card.rank}
                rotate={cardsRotate}
              />
            );
          })}
      </CardsContainer>
    </MyCardsContainer>
  );
};

const GameButtons = styled.div``;

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
