/* eslint-disable react/prop-types */
import React from 'react';
import {
  Modal, ModalBody, ModalHeader, Form,
} from 'reactstrap';
import useReRender from '../../hooks/useReRender';

const BaseModal = function b({
  modalState,
  setModalState,
  title,
  size,
  Body,
  Footer,
  formAction,
}) {
  const { forceReRender } = useReRender();

  return (
    <Modal
      isOpen={modalState}
      toggle={() => {
        forceReRender();
        setModalState(!modalState);
      }}
      size={size}
    >
      <ModalHeader
        toggle={() => {
          forceReRender();
          setModalState(!modalState);
        }}
      >
        {title}
      </ModalHeader>
      {formAction ? (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            formAction();
          }}
        >
          {Body ? (
            <ModalBody>
              <Body />
            </ModalBody>
          ) : (
            <div />
          )}
          {Footer ? <Footer /> : <div />}
        </Form>
      ) : (
        <div>
          {Body ? (
            <ModalBody>
              <Body />
            </ModalBody>
          ) : (
            <div />
          )}
          {Footer ? <Footer /> : <div />}
        </div>
      )}
    </Modal>
  );
};

export default BaseModal;
