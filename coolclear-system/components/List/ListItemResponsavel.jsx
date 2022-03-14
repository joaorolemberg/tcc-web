/* eslint-disable react/prop-types */
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import {
  Card, Col, FormGroup, Input, Label, Row,
} from 'reactstrap';
import ModalWith2Buttons from '../Modal/ModalWith2Buttons';

const ListItemResponsavel = function a({ data }) {
  const [modalState, setModalState] = useState(false);
  const [inputs, setInputs] = useState({ nome: data.nome, email: data.email });
  const { enqueueSnackbar } = useSnackbar();
  return (
    <div>
      <Card body onClick={() => setModalState(true)}>
        <Row>
          <Col>
            {data.nome}
          </Col>
          <Col>
            {data.email}
          </Col>
        </Row>
      </Card>
      <ModalWith2Buttons
        confirmAction={{
          action:
          () => { enqueueSnackbar(`Responsavel ${inputs.nome} com email ${inputs.email} editado`, { variant: 'success' }); },
          label: 'Editar',
        }}
        declineAction={{ action: () => { setModalState(false); }, label: 'Cancelar' }}
        modalState={modalState}
        setModalState={setModalState}
        title="Editar Responsável"
      >
        <FormGroup row>
          <Label for="nome" sm={2}>
            Nome:
          </Label>
          <Col sm={10}>
            <Input
              id="nome"
              name="nome"
              placeholder="Nome do responsável"
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
          <Label for="exampleEmail" sm={2}>
            Email:
          </Label>
          <Col sm={10}>
            <Input
              id="exampleEmail"
              name="email"
              placeholder="Email do responsável"
              type="email"
              onChange={(e) => setInputs((currState) => ({
                ...currState,
                email: e.target.value,
              }))}
              value={inputs.email}
              required
            />
          </Col>
        </FormGroup>
      </ModalWith2Buttons>
    </div>

  );
};

export default ListItemResponsavel;
