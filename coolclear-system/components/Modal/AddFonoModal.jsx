/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Col, Input, FormGroup, Label,
} from 'reactstrap';
import { useSnackbar } from 'notistack';
import ModalWith2Buttons from './ModalWith2Buttons';
import useAuth from '../../hooks/useAuth';
import { addSpeechTherapist } from '../../service/API/speech-therapists';
import useReRender from '../../hooks/useReRender';

function AddFonoModal({
  modalState,
  setModalState,
}) {
  const { coolClearToken } = useAuth();
  const {
    setReRender,
    forceReRender,
  } = useReRender();
  const { enqueueSnackbar } = useSnackbar();
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [inputs, setInputs] = useState({
    name: '', email: '', CRFa: '', institution: '',
  });

  const confirmAction = async () => {
    setLoadingAdd(true);
    const objectApi = {
      first_name: inputs.name,
      last_name: '',
      email: inputs.email,
      speech_therapist: {
        CRFa: inputs.CRFa,
        institution: inputs.institution,
      },
    };
    const response = await addSpeechTherapist({ token: coolClearToken, objectApi });
    if (response.status === 200) {
      enqueueSnackbar('Fono adicionado com sucesso', { variant: 'success' });
      setReRender(true);
    } else {
      enqueueSnackbar('Não foi possível inserir fonoaudiólogo, tente novamente!', { variant: 'error' });
    }

    setLoadingAdd(false);
  };
  const declineAction = () => {
    setModalState(false);
    forceReRender();
  };

  return (
    <ModalWith2Buttons
      confirmAction={{ action: confirmAction, label: 'Adicionar', labelLoading: 'Adicionando' }}
      confirmActionState={loadingAdd}
      declineAction={{ action: declineAction, label: 'Cancelar' }}
      modalState={modalState}
      setModalState={setModalState}
      title="Adicionar"
    >
      <FormGroup row>
        <Label for="name" sm={2}>
          Nome:
        </Label>
        <Col sm={10}>
          <Input
            id="name"
            name="name"
            type="text"
            onChange={(e) => setInputs((currState) => ({
              ...currState,
              name: e.target.value,
            }))}
            value={inputs.name}
            required
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="email" sm={2}>
          Email:
        </Label>
        <Col sm={10}>
          <Input
            id="email"
            name="email"
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
      <FormGroup row>
        <Label for="crfa" sm={2}>
          CRFa:
        </Label>
        <Col sm={10}>
          <Input
            id="crfa"
            name="crfa"
            type="text"
            onChange={(e) => setInputs((currState) => ({
              ...currState,
              CRFa: e.target.value,
            }))}
            value={inputs.CRFa}
            required
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="institution" sm={5}>
          Instituição de trabalho:
        </Label>
        <Col sm={7}>
          <Input
            id="institution"
            name="institution"
            type="text"
            placeholder="Ex: Hospital universitário"
            onChange={(e) => setInputs((currState) => ({
              ...currState,
              institution: e.target.value,
            }))}
            value={inputs.institution}
            required
          />
        </Col>
      </FormGroup>
    </ModalWith2Buttons>
  );
}

export default AddFonoModal;
