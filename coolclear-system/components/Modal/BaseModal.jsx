/* eslint-disable react/prop-types */
import React from 'react';
import {
  Modal, ModalBody, ModalFooter, ModalHeader, Form,
} from 'reactstrap';

const BaseModal = function b({
  modalState,
  setModalState,
  title,
  size,
  Body,
  Footer,
  formAction,
}) {
  return (
    <Modal
      isOpen={modalState}
      toggle={() => setModalState(!modalState)}
      size={size}
    >
      <ModalHeader toggle={() => setModalState(!modalState)}>{title}</ModalHeader>
      {formAction
        ? (
          <Form onSubmit={(e) => { e.preventDefault(); formAction(); }}>
            {Body
              ? (
                <ModalBody>
                  <Body />
                </ModalBody>
              )
              : <div />}
            {Footer
              ? (
                <Footer />
              )
              : <div />}
          </Form>
        )
        : (
          <div>
            {Body
              ? (
                <ModalBody>
                  <Body />
                </ModalBody>
              )
              : <div />}
            {Footer
              ? (
                <Footer />
              )
              : <div />}
          </div>
        )}

    </Modal>
  );
};

export default BaseModal;
