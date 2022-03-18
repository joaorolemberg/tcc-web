/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Col, Input, FormGroup, Label,
} from 'reactstrap';
import ModalWith2Buttons from './ModalWith2Buttons';

function AddConsultModal({
  modalState,
  setModalState,
  confirmAction,
  declineAction,
}) {
  const [inputs, setInputs] = useState({ nome: '', date: '', type: '' });

  return (
    <ModalWith2Buttons
      confirmAction={confirmAction}
      declineAction={declineAction}
      modalState={modalState}
      setModalState={setModalState}
      title="Marcar consulta"
    >
      <FormGroup row>
        <Label for="nome" sm={2}>
          Paciente:
        </Label>
        <Col sm={10}>
          <Input
            id="nome"
            name="nome"
            placeholder="Nome do paciente"
            type="text"
            required
            onChange={(e) => setInputs((currState) => ({
              ...currState,
              nome: e.target.value,
            }))}
            value={inputs.nome}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="exampleType" sm={2}>
          Tipo:
        </Label>
        <Col sm={10}>
          <Input
            id="exampleType"
            name="type"
            type="select"
            onChange={(e) => setInputs((currState) => ({
              ...currState,
              type: e.target.value,
            }))}
            value={inputs.type}
            required
          >
            <option>
              Acompanhamento
            </option>
            <option>
              Avaliação
            </option>
            <option>
              Urgência
            </option>
          </Input>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="exampleEmail" sm={2}>
          Data:
        </Label>
        <Col sm={10}>
          <Input
            id="exampleDate"
            name="date"
            type="datetime-local"
            onChange={(e) => setInputs((currState) => ({
              ...currState,
              date: e.target.value,
            }))}
            value={inputs.date}
            required

          />
        </Col>
      </FormGroup>
    </ModalWith2Buttons>
  );
}

export default AddConsultModal;
