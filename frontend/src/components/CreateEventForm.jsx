import React from 'react';
import PropTypes from 'prop-types';
import InputGroup from '../styles/InputGroup';
import StyledForm from '../styles/StyledForm';

const Form = ({ handleSubmit }) => (
  <StyledForm id="create-event-form" onSubmit={handleSubmit}>
    <div className="form-group">
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
);

export default Form;

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
