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

const StyledEvent = styled.div`
  .create-event-btn {
    display: block;
    margin: 0 auto;
    margin-bottom: 2rem;
  }
`;
const EventButtons = styled.div`
  padding-bottom: 1rem;
  text-align: right;

  button {
    display: inline-block;
    margin-right: 1rem;
  }
`;
const SelectedEvent = styled.div`
  padding: 1rem 2rem;

  div {
    border-bottom: 1px solid ${({ theme }) => theme.colorBlack};
    margin-bottom: 0.8rem;
  }

  p {
    line-height: 1.3;
    overflow-wrap: break-word;
    padding-bottom: 0.7rem;
  }

  span {
    padding-left: 1rem;
  }
`;

const Event = () => {
  const [events, setEvents] = useState([]);
  const [isCreatingEvent, setIsCreateEvent] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { token, userId } = useContext(authContext);

  const handleModalInteraction = () => {
    if (errorMessage) {
      setErrorMessage(null);
    }
    if (selectedEvent) {
      setSelectedEvent(null);
      return;
    }
    setIsCreateEvent(!isCreatingEvent);
  };

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
      mutation CreateEvent($title: String!, $description: String!, $price: Float!, $date: String!){
          createEvent(eventInput: {title: $title, description: $description, price: $price, date: $date}) {
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
        event,
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

  const handleBookEvent = async (eventId) => {
    setErrorMessage(null);
    setIsSaving(true);

    try {
      const { errors } = await query(
        `
        mutation BookEvent($eventId: ID!) {
          bookEvent(eventId: $eventId) {
            _id
            user {
              _id
              email
            }
          }
        }
      `,
        { eventId },
        token,
      );
      setIsSaving(false);

      if (errors) {
        throw errors[0].message;
      }
      handleModalInteraction();
    } catch (e) {
      setErrorMessage(e);
    }
  };

  useEffect(() => {
    query(`query {
        events {
            _id
            title
            description
            price
            date
            creator {
              _id
              email
            }
        }
    }`).then(({ data }) => {
      setEvents(data.events);
      setIsFetching(false);
    });
  }, []);

  return (
    <StyledEvent>
      <HeadingPrimary>Event</HeadingPrimary>
      {isFetching ? (
        <Loader fullScreen />
      ) : (
        <>
          {token && (
            <StyledButton
              className="create-event-btn"
              type="button"
              primary
              onClick={handleModalInteraction}
            >
              Create event
            </StyledButton>
          )}

          <EventsList events={events} setSelectedEvent={setSelectedEvent} />
          <Modal
            title={selectedEvent ? selectedEvent.title : 'Create Event'}
            isOpen={isCreatingEvent || !!selectedEvent}
          >
            <>
              <MessageContainer>
                {errorMessage && <span className="error">{errorMessage}</span>}
                {isSaving && (
                  <span className="auth">
                    {isSaving && isCreatingEvent ? 'Saving' : 'Booking'}
                    ...
                  </span>
                )}
              </MessageContainer>
              {isCreatingEvent && <CreateEventForm handleSubmit={handleCreateEvent} />}
              {!!selectedEvent && (
                <SelectedEvent>
                  <div>
                    <label htmlFor="description">Description:</label>
                    <p id="description">{selectedEvent.description}</p>
                  </div>
                  <div>
                    <label htmlFor="price">Price:</label>
                    <span id="price">
₱
                      {selectedEvent.price}
                    </span>
                  </div>
                  <div>
                    <label htmlFor="date">Date:</label>
                    <span id="date">
                      {new Date(parseInt(selectedEvent.date, 10)).toDateString()}
                    </span>
                  </div>
                  <div>
                    <label htmlFor="creator">Created By:</label>
                    <span id="creator">
                      {selectedEvent.creator._id === userId ? 'You' : selectedEvent.creator.email}
                    </span>
                  </div>
                </SelectedEvent>
              )}

              <EventButtons>
                {isCreatingEvent ? (
                  <ButtonWithSpinner
                    type="submit"
                    form="create-event-form"
                    primary
                    isLoading={isSaving}
                    buttonText="Save"
                  />
                ) : (
                  !!selectedEvent
                  && selectedEvent.creator._id !== userId && (
                    <ButtonWithSpinner
                      type="submit"
                      primary
                      isLoading={isSaving}
                      buttonText="Book"
                      onClick={() => handleBookEvent(selectedEvent._id)}
                    />
                  )
                )}
                <StyledButton
                  type="button"
                  danger
                  onClick={() => {
                    if (selectedEvent) {
                      setSelectedEvent(null);
                    }
                    handleModalInteraction();
                  }}
                  disabled={isSaving}
                >
                  Close
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
