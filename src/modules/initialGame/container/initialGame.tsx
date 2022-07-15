import * as React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { finishNamesSelecting } from '../../../redux/initialReducer/initialReducerActions';

export const InitialGame = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = React.useState('');
  const [secondName, setSecondName] = React.useState('');

  const finishNamesSelectingFN = (firstName: string, secondName: string) => {
    dispatch(finishNamesSelecting({ firstName, secondName }));
  };

  return (
    <Container>
      <SelectNamesContainer>
        <SelectNameBlock>
          <SelectNameLabel>First User</SelectNameLabel>
          <SelectNameInput
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </SelectNameBlock>
        <SelectNameBlock>
          <SelectNameLabel>Second User</SelectNameLabel>
          <SelectNameInput
            value={secondName}
            onChange={e => setSecondName(e.target.value)}
          />
        </SelectNameBlock>
        <ApplyNamesButton
          onClick={() => {
            finishNamesSelectingFN(firstName, secondName);
          }}
        >
          Apply Names
        </ApplyNamesButton>
      </SelectNamesContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;

const SelectNamesContainer = styled.div`
  position: absolute;
  border: 1px solid red;
  padding: 50px;
  top: 20%;
`;

const SelectNameBlock = styled.div``;

const SelectNameLabel = styled.div`
  color: red;
`;

const SelectNameInput = styled.input``;

const ApplyNamesButton = styled.button``;
