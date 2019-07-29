import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import StyledButton from '../styles/StyledButton';

const List = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  list-style: none;
  margin: 0 auto;
  padding-bottom: 3rem;
  width: 70vw;
`;

const ListItem = styled.li`
  background-image: ${({ theme }) => `linear-gradient(to right, ${theme.colorMain} 50%, ${theme.colorSecondary})`};
  border: 1px solid ${({ theme }) => theme.colorWhite};
  border-radius: 3px;
  box-shadow: 0 0 5px ${({ theme }) => theme.colorBlack};
  padding: 2rem;
  position: relative;

  h4,
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  h4 {
    background-color: ${({ theme }) => theme.colorWhite};
    font-weight: 900;
    font-size: 1.7rem;
    margin-left: -2rem;
    width: 60%;
  }

  p {
    font-weight: 700;
    margin-top: 1rem;
    line-height: 1.3;
    width: 80%;
  }

  button {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
  }
`;

const EventsList = ({ events, setSelectedEvent }) => (
  <List>
    {events.map(({
      _id, title, description, ...rest
    }) => (
      <ListItem key={_id}>
        <h4>{title}</h4>
        <p>{description}</p>
        <StyledButton
          type="button"
          primary
          onClick={() => setSelectedEvent({
            _id,
            title,
            description,
            ...rest,
          })
          }
        >
          View
        </StyledButton>
      </ListItem>
    ))}
  </List>
);

export default EventsList;

EventsList.propTypes = {
  events: PropTypes.instanceOf(Array).isRequired,
  setSelectedEvent: PropTypes.func.isRequired,
};
