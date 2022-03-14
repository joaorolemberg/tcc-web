/* eslint-disable react/prop-types */
import React from 'react';
import {
  Modal, ModalBody, ModalFooter, ModalHeader, Button, Form,
} from 'reactstrap';

const ModalWith2Buttons = function b({
  title,
  modalState,
  setModalState,
  confirmAction,
  declineAction,
  children,
  size,
  onExit,
}) {
  return (
    <Modal
      isOpen={modalState}
      toggle={() => setModalState(!modalState)}
      size={size}
      onExit={() => onExit()}
    >
      <ModalHeader toggle={() => setModalState(!modalState)}>{title}</ModalHeader>
      <Form onSubmit={(e) => { e.preventDefault(); confirmAction.action(); }}>
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter>
          <Button style={{ backgroundColor: '#2E7D32' }} type="submit">
            {confirmAction.label}
          </Button>
          <Button onClick={() => { declineAction.action(); }} type="button">
            {declineAction.label}
          </Button>
        </ModalFooter>
      </Form>

    </Modal>
  );
};

export default ModalWith2Buttons;
