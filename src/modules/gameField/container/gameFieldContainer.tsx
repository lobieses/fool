import * as React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { usersIsReady } from '../../../redux/gameSessionReducer/gameSessionReducer';
import { startGame } from '../../../redux/gameSessionReducer/gameSessionReducerAction';
import { GameField } from '../components/GameField';
import { OpponentCards } from '../components/OpponentsCards';
import { Deck } from '../components/Deck';
import { LightsOut } from '../components/LightsOut';
import { MyCards } from '../components/MyCards';

export const Game = () => {
  const dispatch = useDispatch();
  const usersIsReadyForGame = useSelector(usersIsReady);

  return (
    <>
      {usersIsReadyForGame ? (
        <Container>
          <OpponentCardsContainer>
            <OpponentCards />
          </OpponentCardsContainer>

          <DeckContainer>
            <Deck />
          </DeckContainer>

          <GameFieldWrapper>
            <GameField />
          </GameFieldWrapper>

          <LightsOutContainer>
            <LightsOut />
          </LightsOutContainer>

          <MyCardsContainer>
            <MyCards />
          </MyCardsContainer>
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

const OpponentCardsContainer = styled.div`
  width: 100%;
  height: 100%;
  grid-column-start: 1;
  grid-column-end: 4;
`;

const DeckContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const GameFieldWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const LightsOutContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const MyCardsContainer = styled.div`
  width: 100%;
  height: 100%;
  grid-column-start: 1;
  grid-column-end: 4;
`;
