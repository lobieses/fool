import * as React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { selectingNamesValidator } from '../utils/selectingNamesValidator';
import { setNames } from '../../../redux/gameSessionReducer/gameSessionReducerAction';
import { finishNamesSelecting } from '../../../redux/initialReducer/initialReducerActions';

export const SelectingNames = () => {
  const dispatch = useDispatch();

  const finishNamesSelectingFN = (firstName: string, secondName: string) => {
    dispatch(setNames({ firstName, secondName }));
    dispatch(finishNamesSelecting());
  };

  return (
    <Container>
      <SelectNamesContainer>
        <Formik
          initialValues={{ firstName: '', secondName: '' }}
          onSubmit={values => {
            finishNamesSelectingFN(values.firstName, values.secondName);
          }}
          validate={values => {
            const errors = selectingNamesValidator(values);
            return errors;
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            touched,
          }) => (
            <form onSubmit={handleSubmit}>
              <SelectNameBlock>
                <SelectNameLabel>First User</SelectNameLabel>
                <SelectNameInput
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.firstName && touched.firstName && (
                  <SelectNameError>{errors.firstName}</SelectNameError>
                )}
              </SelectNameBlock>
              <SelectNameBlock>
                <SelectNameLabel>Second User</SelectNameLabel>
                <SelectNameInput
                  name="secondName"
                  value={values.secondName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.secondName && touched.secondName && (
                  <SelectNameError>{errors.secondName}</SelectNameError>
                )}
              </SelectNameBlock>
              <ApplyNamesButton type="submit">Apply Names</ApplyNamesButton>
            </form>
          )}
        </Formik>
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

const SelectNameError = styled.div`
  color: red;
`;

const SelectNameInput = styled.input``;

const ApplyNamesButton = styled.button``;
