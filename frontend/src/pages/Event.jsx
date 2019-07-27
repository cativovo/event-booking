/* eslint-disable no-throw-literal */
import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import query from '../utils/query';
import InputGroup from '../styles/InputGroup';
import HeadingPrimary from '../styles/HeadingPrimary';
import StyledButton from '../styles/StyledButton';
import StyledForm from '../styles/StyledForm';
import Modal from '../components/Modal';
import MessageContainer from '../styles/MessageContainer';
import authContext from '../context/authContext';

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
  const { token } = useContext(authContext);

  useEffect(() => {
    query(`query {
        events {
            _id
            title
        }
    }`).then(({ data }) => {
      setEvents(data.events);
    });
  }, []);

  const handleModalInteraction = () => setIsModalOpen(!isModalOpen);

  const handleError = (condition, target) => {
    if (condition) {
      target.focus();
      throw 'Please fill all fields correctly';
    }
  };

  const handleCreateEvent = (e) => {
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

      query(
        `
      mutation {
          createEvent(eventInput: {title: "${title.value}", description: "${
  description.value
}", price: ${parseFloat(price.value, 10)}, date: "${date.value}"}) {
            _id
            title
            description
            price
            date
          }
        }
      `,
        token,
      ).then((res) => {
        const { errors, data } = res;
        setIsSaving(false);

        if (errors) {
          throw errors[0].message;
        }

        setEvents([...events, data.createEvent]);
      });
    } catch (message) {
      setErrorMessage(message);
    }
  };

  return (
    <StyledEvent>
      <HeadingPrimary>Event</HeadingPrimary>
      {token && (
        <StyledButton type="button" primary onClick={handleModalInteraction}>
          Create event
        </StyledButton>
      )}

      <ul>
        {events.map(({ _id, title }) => (
          <li key={_id}>{title}</li>
        ))}
      </ul>
      <Modal title="Create Event" isOpen={isModalOpen} onRequestClose={handleModalInteraction}>
        <>
          <StyledForm id="create-event-form" onSubmit={handleCreateEvent}>
            <div className="form-group">
              <MessageContainer>
                {errorMessage && <span className="error">{errorMessage}</span>}
                {isSaving && <span className="auth">Saving</span>}
              </MessageContainer>
              <InputGroup>
                <input type="text" id="title" placeholder="Title" name="title" />
                <label htmlFor="title">Title</label>
              </InputGroup>
              <InputGroup>
                <input type="number" id="price" placeholder="Price" name="price" step="0.01" />
                <label htmlFor="price">Price</label>
              </InputGroup>
              <InputGroup>
                <input type="date" id="date" name="date" />
                <label htmlFor="date">Date</label>
              </InputGroup>
              <InputGroup>
                <textarea id="description" rows="5" placeholder="Description" name="description" />
                <label htmlFor="Description">Description</label>
              </InputGroup>
            </div>
          </StyledForm>
          <EventButtons>
            <StyledButton type="submit" form="create-event-form" primary disabled={isSaving}>
              Save
            </StyledButton>
            <StyledButton type="button" danger onClick={handleModalInteraction} disabled={isSaving}>
              Cancel
            </StyledButton>
          </EventButtons>
        </>
      </Modal>
    </StyledEvent>
  );
};

export default Event;
