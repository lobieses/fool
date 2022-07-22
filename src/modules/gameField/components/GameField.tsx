import * as React from 'react';
import { useDrop } from 'react-dnd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { makeCardMove } from '../../../redux/gameSessionReducer/gameSessionReducerAction';
import { MovedCardInfo } from '../../../redux/gameSessionReducer/models';
import { getGameField } from '../../../redux/gameSessionReducer/gameSessionReducer';
import { Card } from './Card';

export const GameField = () => {
  const dispatch = useDispatch();
  const gameField = useSelector(getGameField);

  const onCardMove = React.useCallback(
    (card: MovedCardInfo) => {
      if (
        !gameField ||
        gameField?.some(cardOnField => cardOnField.rank === card.rank)
      ) {
        dispatch(makeCardMove({ ...card }));
      }
    },
    [gameField],
  );

  React.useEffect(() => {
    console.log(gameField);
  }, [gameField]);

  const [, drop] = useDrop(
    () => ({
      accept: 'Card',
      drop: onCardMove,
      collect: monitor => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [gameField],
  );

  return (
    <GameFieldContainer ref={drop}>
      {gameField &&
        gameField.map(card => {
          return (
            <Card
              suitOfCard={card.suitOfCard}
              rank={card.rank}
              rankForComparison={card.rankForComparison}
              key={card.suitOfCard + card.rank}
              canDrag={false}
            />
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
