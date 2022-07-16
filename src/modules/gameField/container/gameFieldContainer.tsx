import * as React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  getFirstUser,
  usersIsReady,
} from '../../../redux/gameSessionReducer/gameSessionReducer';
import { startGame } from '../../../redux/gameSessionReducer/gameSessionReducerAction';
import { Card } from '../components/Card';

export const GameFieldContainer = () => {
  const dispatch = useDispatch();
  const usersIsReadyForGame = useSelector(usersIsReady);
  const firstUser = useSelector(getFirstUser);

  return (
    <>
      {usersIsReadyForGame ? (
        <Container>
          <OpponentCards />
          <Deck />
          <GameField />
          <LightsOut />
          <MyCards>
            {firstUser.cards &&
              firstUser.cards.map(card => {
                return <Card suitOfCard={card.suitOfCard} rank={card.rank} />;
              })}
          </MyCards>
        </Container>
      ) : (
        <ReadyButtonContainer>
          <ReadyButton onClick={() => dispatch(startGame())}>
            Start Game
          </ReadyButton>
        </ReadyButtonContainer>
      )}
    </>
  );
};

const ReadyButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ReadyButton = styled.button`
  width: 200px;
  height: 70px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 2fr 3fr 2fr;
`;

const OpponentCards = styled.div`
  width: 100%;
  height: 100%;
  grid-column-start: 1;
  grid-column-end: 4;
`;

const Deck = styled.div`
  width: 100%;
  height: 100%;
`;

const GameField = styled.div`
  width: 100%;
  height: 100%;
`;

const LightsOut = styled.div`
  width: 100%;
  height: 100%;
`;

const MyCards = styled.div`
  width: 100%;
  height: 100%;
  grid-column-start: 1;
  grid-column-end: 4;
  display: flex;
  justify-content: space-around;
`;
