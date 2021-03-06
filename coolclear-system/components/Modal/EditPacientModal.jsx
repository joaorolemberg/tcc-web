/* eslint-disable react/prop-types */
import Router from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import {
  Col, Input, FormGroup, Label, Row,
} from 'reactstrap';
import useAuth from '../../hooks/useAuth';
import { editPatient } from '../../service/API/pacients';
import ModalWith2Buttons from './ModalWith2Buttons';

function EditPacientModal({
  modalState,
  setModalState,
  declineAction,
  data,
}) {
  const { coolClearToken } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const initialState = {
    nome: data.nome,
    prontuario: data.prontuario,
    dataImplante: data.dataImplante,
    dataNascimento: data.dataNascimento,
    sexo: data.sexo,
  };
  const [inputs, setInputs] = useState(initialState);

  async function handleEditPatient() {
    const objectApi = {
      first_name: inputs.nome,
      last_name: '',
      medical_record_number: inputs.prontuario,
      implant_date: inputs.dataImplante,
      birthdate: inputs.dataNascimento,
      gender: inputs.sexo,
    };

    const response = await editPatient({
      token: coolClearToken,
      objectApi,
      pacient_id: data.id,
    });

    if (response.status === 200) {
      enqueueSnackbar('Paciente editado com sucesso! Recarregando página.', { variant: 'success' });
      setTimeout(() => { Router.reload(); }, 2000);
    } else {
      enqueueSnackbar('Não foi possível editar esse paciente.', { variant: 'error' });
    }
  }
  return (
    <ModalWith2Buttons
      confirmAction={{ action: handleEditPatient, label: 'Editar' }}
      declineAction={declineAction}
      modalState={modalState}
      setModalState={setModalState}
      title="Editar Paciente"
    >
      <Row>
        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
          <FormGroup>
            <Label for="nome">
              Nome:
            </Label>
            <Col>
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
        </Col>
        <Col xl={6} lg={6} md={12} sm={12} xs={12}>
          <FormGroup>
            <Label for="prontuario">
              Prontuário:
            </Label>
            <Col>
              <Input
                id="prontuario"
                name="prontuario"
                placeholder="Número do prontuário"
                type="text"
                onChange={(e) => setInputs((currState) => ({
                  ...currState,
                  prontuario: e.target.value,
                }))}
                value={inputs.prontuario}
                required
              />
            </Col>
          </FormGroup>
        </Col>
        <Col xl={6} lg={6} md={12} sm={12} xs={12}>
          <FormGroup>
            <Label for="nascimento">
              Data de nascimento:
            </Label>
            <Col>
              <Input
                id="nascimento"
                name="nascimento"
                type="date"
                onChange={(e) => setInputs((currState) => ({
                  ...currState,
                  dataNascimento: e.target.value,
                }))}
                value={inputs.dataNascimento}
                required
              />
            </Col>
          </FormGroup>
        </Col>
        <Col xl={6} lg={6} md={12} sm={12} xs={12}>
          <FormGroup>
            <Label for="dataImplante">
              Data implante:
            </Label>
            <Col>
              <Input
                id="dataImplante"
                name="dataImplante"
                type="date"
                onChange={(e) => setInputs((currState) => ({
                  ...currState,
                  dataImplante: e.target.value,
                }))}
                value={inputs.dataImplante}
                required
              />
            </Col>
          </FormGroup>
        </Col>
        <Col xl={6} lg={6} md={12} sm={12} xs={12}>
          <FormGroup>
            <Label for="sexo">
              Sexo:
            </Label>
            <Col>
              <Input
                id="sexo"
                name="sexo"
                type="select"
                onChange={(e) => setInputs((currState) => ({
                  ...currState,
                  sexo: e.target.value,
                }))}
                value={inputs.sexo}
                required
              >
                <option value="M">
                  Masculino
                </option>
                <option value="F">
                  Feminino
                </option>
              </Input>
            </Col>
          </FormGroup>
        </Col>
      </Row>
    </ModalWith2Buttons>
  );
}

export default EditPacientModal;
