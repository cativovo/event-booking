import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import query from '../utils/query';
import authContext from '../context/authContext';
import Loader from '../components/Loader';
import StyledButton from '../styles/StyledButton';

const StyledBooking = styled.div`
  h1 {
    text-align: center;
  }
`;
const BookingsList = styled.ul`
  list-style: none;

  li > div {
    border: 2px solid ${({ theme }) => theme.colorMain};
    margin: 0 auto;
    margin-bottom: 2rem;
    padding: 1rem 2rem;
    position: relative;
    width: 70%;

    h2 {
      text-align: center;
    }

    & > div {
      border-bottom: 1px solid ${({ theme }) => theme.colorMain};
      
      span {
          padding-left: 1rem;
      }
    }

    button {
      right: 2rem;
      top: 2rem;
      position: absolute;
    }
  }
`;

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useContext(authContext);

  const handleCancelBooking = (_id) => {
    const newBookings = bookings.filter(booking => booking._id !== _id);
    setBookings(newBookings);
    query(
      `
        mutation CancelBooking($bookingId: ID!) {
            cancelBooking(bookingId: $bookingId) {
                _id
            }
        }
      `,
      { bookingId: _id },
      token,
    );
  };

  useEffect(() => {
    query(
      `
            query {
                bookings {
                    _id
                    event {
                        title
                        description
                        price
                        date
                        creator {
                            _id
                            email
                        }
                    }
                }
            }
        `,
      undefined,
      token,
    ).then(({ data }) => {
      setIsLoading(false);
      setBookings(data.bookings);
    });
  }, [token]);

  return (
    <StyledBooking>
      <h1>Booking</h1>
      {isLoading && <Loader />}
      <BookingsList>
        {bookings.map(({
          _id, event: {
            title, description, price, date, creator,
          },
        }) => (
          <li key={_id}>
            <div>
              <h2>{title}</h2>
              <div>
                <label htmlFor="description">Description:</label>
                <p id="description">{description}</p>
              </div>
              <div>
                <label htmlFor="price">Price:</label>
                <span id="price">
₱
                  {price}
                </span>
              </div>
              <div>
                <label htmlFor="date">Date:</label>
                <span id="date">{new Date(parseInt(date, 10)).toDateString()}</span>
              </div>
              <div>
                <label htmlFor="creator">Created by:</label>
                <span id="creator">{creator.email}</span>
              </div>
              <StyledButton danger type="button" onClick={() => handleCancelBooking(_id)}>
                Cancel
              </StyledButton>
            </div>
          </li>
        ))}
      </BookingsList>
    </StyledBooking>
  );
};

export default Booking;
