import * as React from 'react';
import styled from 'styled-components';

export const InvertedCard = () => {
  return <CardContainer></CardContainer>;
};

const CardContainer = styled.div`
  width: 150px;
  height: 220px;
  background-image: url('backOfCard.jpg');
  background-size: cover;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  z-index: 999;
`;
