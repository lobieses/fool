import * as React from 'react';
import styled from 'styled-components';
import {
  ClubIcon,
  DiamondIcon,
  HeartIcon,
  SpadeIcon,
} from '../../../components/icons/icons';
import { Rank, SuitOfCard } from '../../../redux/models';

const suitOfCards: {
  [key: string]: React.ReactElement;
} = {
  spade: <SpadeIcon />,
  heart: <HeartIcon />,
  diamond: <DiamondIcon />,
  club: <ClubIcon />,
};

interface CardProps {
  suitOfCard: SuitOfCard;
  rank: Rank;
}

export const Card = ({ suitOfCard, rank }: CardProps) => {
  return (
    <CardContainer>
      <RankContainer>{rank}</RankContainer>
      <SuitOfCardContainer>{suitOfCards[suitOfCard]}</SuitOfCardContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  width: 150px;
  height: 220px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const SuitOfCardContainer = styled.div``;
const RankContainer = styled.div`
  font-size: 25px;
`;
