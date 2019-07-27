import React from 'react';
import { createGlobalStyle } from 'styled-components';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import HeadingPrimary from '../styles/HeadingPrimary';

ReactModal.setAppElement('#root');

const ModalStyle = createGlobalStyle`
 .modal-content {
    background-color: ${({ theme }) => theme.colorMain};
    border-radius: 3px;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 35vw;
  }

  .modal-overlay {
    background-color: rgba(45, 52, 54, 0.9);
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    opacity: 0;
    position: fixed;
    transition: .3s opacity;
    z-index: 100;

    &--after-open {
      opacity: 1;
    }

    &--before-close {
      opacity: 0;
    }
  }`;

const Modal = ({ children, title, ...props }) => (
  <>
    <ModalStyle />
    <ReactModal
      className="modal-content"
      overlayClassName={{
        base: 'modal-overlay',
        afterOpen: 'modal-overlay--after-open',
        beforeClose: 'modal-overlay--before-close',
      }}
      closeTimeoutMS={300}
      {...props}
    >
      <div>
        <HeadingPrimary>{title}</HeadingPrimary>
        {children}
      </div>
    </ReactModal>
  </>
);

export default Modal;

Modal.defaultProps = {
  title: '',
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
};
