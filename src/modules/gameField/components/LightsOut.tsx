import * as React from 'react';
import { useSelector } from 'react-redux';
import { getWalkingPlayer } from '../../../redux/gameSessionReducer/gameSessionReducer';
import styled from 'styled-components';

export const LightsOut = () => {
  const walkingUser = useSelector(getWalkingPlayer);
  return <LightsOutContainer>{walkingUser}</LightsOutContainer>;
};

const LightsOutContainer = styled.div`
  color: red;
  font-size: 30px;
  margin-left: 100px;
`;
