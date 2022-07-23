import * as React from 'react';
import { useDrop } from 'react-dnd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { makeCardMove } from '../../../redux/gameSessionReducer/gameSessionReducerAction';
import { MovedCardInfo } from '../../../redux/gameSessionReducer/models';
import { getGameField } from '../../../redux/gameSessionReducer/gameSessionReducer';
import { movingUser } from '../models/models';
import { ReceivingCard } from './ReceivingCard';
import { Card } from './Card';

export const GameField = () => {
  const dispatch = useDispatch();
  const gameField = useSelector(getGameField);

  const onCardMove = React.useCallback(
    (card: MovedCardInfo) => {
      if (
        !gameField ||
        (gameField.length < 6 &&
          gameField?.some(
            cardOnField =>
              cardOnField.rank === card.rank ||
              (cardOnField.beatOfCard &&
                cardOnField.beatOfCard?.rank === card.rank),
          ))
      ) {
        dispatch(makeCardMove({ ...card }));
      }
    },
    [gameField, dispatch],
  );

  const [, drop] = useDrop(
    () => ({
      accept: movingUser,
      drop: onCardMove,
    }),
    [gameField, dispatch],
  );

  return (
    <GameFieldContainer ref={drop}>
      {gameField &&
        gameField.map(card => {
          return (
            <ReceivingCard
              suitOfCard={card.suitOfCard}
              rank={card.rank}
              rankForComparison={card.rankForComparison}
              key={card.suitOfCard + card.rank}
              alreadyBeat={!!card.beatOfCard}
            >
              {card.beatOfCard && (
                <Card
                  suitOfCard={card.beatOfCard.suitOfCard}
                  rank={card.beatOfCard.rank}
                  rankForComparison={card.beatOfCard.rankForComparison}
                  rotate={20}
                  canDrag={false}
                />
              )}
            </ReceivingCard>
          );
        })}
    </GameFieldContainer>
  );
};

const GameFieldContainer = styled.div`
  display: flex;
  height: 100%;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
`;
