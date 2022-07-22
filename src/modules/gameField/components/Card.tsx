import * as React from 'react';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';
import {
  ClubIcon,
  DiamondIcon,
  HeartIcon,
  SpadeIcon,
} from '../../../components/icons/icons';
import { Rank, SuitOfCard } from '../../../redux/gameSessionReducer/models';

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
  rankForComparison: number;
  userName?: string;
  rotate?: number;
  canDrag?: boolean;
}

export const Card = ({
  suitOfCard,
  rank,
  rotate,
  canDrag = true,
  rankForComparison,
  userName = '',
}: CardProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'Card',
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
    canDrag: canDrag,
    item: { suitOfCard, rank, rankForComparison, userName },
  }));

  return (
    <CardContainer ref={drag}>
      <CardInfoContainer rotate={rotate} isDragging={isDragging}>
        <RankContainer>{rank}</RankContainer>
        <SuitOfCardContainer>{suitOfCards[suitOfCard]}</SuitOfCardContainer>
      </CardInfoContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div<any>`
  width: 150px;
  height: 220px;
`;

const CardInfoContainer = styled.div<any>`
  background-color: rgba(0, 0, 0, 0.2);
  height: 100%;
  border-radius: 10px;
  display: ${({ isDragging }) => (isDragging ? 'none' : 'flex')};
  justify-content: space-between;
  padding: 10px;
  ${({ rotate }) => rotate && `transform: rotate(${rotate}deg)`};
`;

const SuitOfCardContainer = styled.div``;

const RankContainer = styled.div`
  font-size: 25px;
`;
