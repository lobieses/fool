import * as React from 'react';
import styled from 'styled-components';
import { cardHeight, cardWidth } from '../models/models';

export const InvertedCard = () => {
  return <CardContainer></CardContainer>;
};

const CardContainer = styled.div`
  width: ${cardWidth}px;
  height: ${cardHeight}px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  z-index: 999;
`;
