/* eslint-disable no-throw-literal */
import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import query from '../utils/query';
import HeadingPrimary from '../styles/HeadingPrimary';
import StyledButton from '../styles/StyledButton';
import CreateEventForm from '../components/CreateEventForm';
import Modal from '../components/Modal';
import EventsList from '../components/EventsList';
import ButtonWithSpinner from '../components/ButtonWithSpinner';
import MessageContainer from '../styles/MessageContainer';
import Loader from '../components/Loader';
import authContext from '../context/authContext';
import objectToGraphqlInput from '../utils/objectToGraphqlInput';

const StyledEvent = styled.div``;
const EventButtons = styled.div`
  padding-bottom: 1rem;
  text-align: right;

  button {
    display: inline-block;
    margin-right: 1rem;
  }
`;

const Event = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const { token } = useContext(authContext);

  useEffect(() => {
    query(`query {
        events {
            _id
            title
            creator {
              _id
            }
        }
    }`).then(({ data }) => {
      setEvents(data.events);
      setIsFetching(false);
    });
  }, []);

  const handleModalInteraction = () => setIsModalOpen(!isModalOpen);

  const handleError = (condition, target) => {
    if (condition) {
      target.focus();
      throw 'Please fill all fields correctly';
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    const {
      title, price, date, description,
    } = e.target;

    try {
      handleError(!title.value, title);
      handleError(!price.value || price.value < 0, price, price.value);
      handleError(!date.value, date);
      handleError(!description.value, description);

      setIsSaving(true);

      const event = {
        title: title.value,
        description: description.value,
        price: parseFloat(price.value, 10),
        date: date.value,
      };

      const { errors, data } = await query(
        `
      mutation {
          createEvent(eventInput: ${objectToGraphqlInput(event)}) {
            _id
            title
            description
            price
            date
            creator {
              _id
            }
          }
        }
      `,
        token,
      );
      setIsSaving(false);

      if (errors) {
        throw errors[0].message;
      }

      setEvents([...events, data.createEvent]);
      handleModalInteraction();
    } catch (message) {
      setErrorMessage(message);
    }
  };

  return (
    <StyledEvent>
      <HeadingPrimary>Event</HeadingPrimary>
      {isFetching ? (
        <Loader fullScreen />
      ) : (
        <>
          {token && (
            <StyledButton type="button" primary onClick={handleModalInteraction}>
              Create event
            </StyledButton>
          )}

          <EventsList events={events}/>
          <Modal title="Create Event" isOpen={isModalOpen}>
            <>
              <MessageContainer>
                {errorMessage && <span className="error">{errorMessage}</span>}
                {isSaving && <span className="auth">Saving...</span>}
              </MessageContainer>
              <CreateEventForm handleSubmit={handleCreateEvent}/>
              <EventButtons>
                <ButtonWithSpinner type="submit" form="create-event-form" primary isLoading={isSaving} buttonText="Save" />
                <StyledButton
                  type="button"
                  danger
                  onClick={handleModalInteraction}
                  disabled={isSaving}
                >
                  Cancel
                </StyledButton>
              </EventButtons>
            </>
          </Modal>
        </>
      )}
    </StyledEvent>
  );
};

export default Event;
