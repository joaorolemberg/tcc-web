/* eslint-disable react/prop-types */
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import {
  Card, Col, FormGroup, Input, Label, Row, Button,
} from 'reactstrap';
import { sendResetPwdEmail } from '../../service/API/account';
import ModalWith2Buttons from '../Modal/ModalWith2Buttons';

const ListItemResponsavel = function a({ data }) {
  const [modalState, setModalState] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [inputs, setInputs] = useState({ nome: data.nome, email: data.email });
  const { enqueueSnackbar } = useSnackbar();

  async function handleSendEmail() {
    setSendingEmail(true);
    const response = await sendResetPwdEmail({ email: data.email });
    if (response.status === 200) {
      enqueueSnackbar('Email enviado!', { variant: 'success' });
    } else {
      enqueueSnackbar('Ocorreu um erro, tente novamente!', { variant: 'error' });
    }
    setSendingEmail(false);
  }
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
          () => {
            enqueueSnackbar('Edição não habilitada', { variant: 'error' });
          },
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
              disabled
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
              disabled
              onChange={(e) => setInputs((currState) => ({
                ...currState,
                email: e.target.value,
              }))}
              value={inputs.email}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Button
            onClick={() => {
              handleSendEmail();
            }}
          >
            {sendingEmail
              ? 'Enviando...'
              : 'Enviar email de recuperação de senha '}
          </Button>
        </FormGroup>
      </ModalWith2Buttons>
    </div>

  );
};

export default ListItemResponsavel;
