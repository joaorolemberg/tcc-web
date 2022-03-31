/* eslint-disable react/prop-types */
import React from 'react';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Form,
} from 'reactstrap';
import useReRender from '../../hooks/useReRender';

const ModalWith2Buttons = function b({
  title,
  modalState,
  setModalState,
  confirmAction,
  confirmActionState,
  declineAction,
  children,
  size,
}) {
  const { forceReRender } = useReRender();
  return (
    <Modal
      isOpen={modalState}
      toggle={() => {
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
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          confirmAction.action();
        }}
      >
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          {confirmActionState !== null
            ? (
              <Button style={{ backgroundColor: '#2E7D32' }} disabled={confirmActionState} type="submit">
                {confirmActionState
                  ? confirmAction.labelLoading
                  : confirmAction.label}
              </Button>
            )
            : (
              <Button style={{ backgroundColor: '#2E7D32' }} type="submit">
                {confirmAction.label}
              </Button>
            )}

          <Button
            onClick={() => {
              declineAction.action();
            }}
            type="button"
          >
            {declineAction.label}
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default ModalWith2Buttons;
