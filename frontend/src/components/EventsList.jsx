import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import authContext from '../context/authContext';
import StyledButton from '../styles/StyledButton';

const ListItem = styled.li``;

const EventsList = ({ events }) => {
  const { userId } = useContext(authContext);

  return (
    <ul>
      {events.map(({ _id, title, creator }) => (
        <ListItem key={_id}>
          {title}
          {userId === creator._id ? 'mine' : 'yours'}
        </ListItem>
      ))}
    </ul>
  );
};

export default EventsList;

EventsList.propTypes = {
  events: PropTypes.instanceOf(Array).isRequired,
};
