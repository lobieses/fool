import * as React from 'react';
import { useDrop } from 'react-dnd';
import styled from 'styled-components';
import {
  ClubIcon,
  DiamondIcon,
  HeartIcon,
  SpadeIcon,
} from '../../../components/icons/icons';
import {
  MovedCardInfo,
  Rank,
  SuitOfCard,
} from '../../../redux/gameSessionReducer/models';
import { protectingUser, cardHeight, cardWidth } from '../models/models';
import { beatTheMovedCard } from '../../../redux/gameSessionReducer/gameSessionReducerAction';
import { useDispatch, useSelector } from 'react-redux';
import { canBeat } from '../utils/utils';
import { getTrump } from '../../../redux/gameSessionReducer/gameSessionReducer';

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
  alreadyBeat: boolean;
  userName?: string;
  rotate?: number;
  children?: React.ReactElement | null;
}

export const ReceivingCard = ({
  suitOfCard,
  rank,
  rotate,
  rankForComparison,
  userName = '',
  children,
  alreadyBeat,
}: CardProps) => {
  const dispatch = useDispatch();
  const trump = useSelector(getTrump);

  const onCardDrop = React.useCallback(
    (card: MovedCardInfo) => {
      if (
        !alreadyBeat &&
        trump &&
        canBeat(
          rankForComparison,
          suitOfCard,
          card.rankForComparison,
          card.suitOfCard,
          trump,
        )
      ) {
        console.log(alreadyBeat);
        dispatch(
          beatTheMovedCard({
            movedCardRank: rank,
            movedSuitOfCard: suitOfCard,
            beatCard: {
              suitOfCard: card.suitOfCard,
              rank: card.rank,
              rankForComparison: card.rankForComparison,
            },
          }),
        );
      }
    },
    [suitOfCard, rankForComparison, trump, rank, alreadyBeat, dispatch],
  );

  const [, drop] = useDrop(
    () => ({
      accept: protectingUser,
      drop: onCardDrop,
    }),
    [suitOfCard, rankForComparison, trump, rank, alreadyBeat, dispatch],
  );

  return (
    <CardContainer ref={drop}>
      <CardInfoContainer rotate={rotate}>
        <RankContainer>{rank}</RankContainer>
        <SuitOfCardContainer>{suitOfCards[suitOfCard]}</SuitOfCardContainer>
      </CardInfoContainer>
      {children && <ChildrenContainer>{children}</ChildrenContainer>}
    </CardContainer>
  );
};

const ChildrenContainer = styled.div`
  position: absolute;
  top: 0;
`;

const CardContainer = styled.div<any>`
  width: ${cardWidth}px;
  height: ${cardHeight}px;
  position: relative;
`;

const CardInfoContainer = styled.div<any>`
  background-color: rgba(0, 0, 0, 0.2);
  height: 100%;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  ${({ rotate }) => rotate && `transform: rotate(${rotate}deg)`};
`;

const SuitOfCardContainer = styled.div``;

const RankContainer = styled.div`
  font-size: 25px;
`;
