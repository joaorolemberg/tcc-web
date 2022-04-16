/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  Col, Input, FormGroup, Label,
} from 'reactstrap';
import { useSnackbar } from 'notistack';
import ModalWith2Buttons from './ModalWith2Buttons';
import DatalistInput from '../List/DatalistInput';
import useAuth from '../../hooks/useAuth';
import { fetchSpeechTherapist } from '../../service/API/speech-therapists';
import { addConsult } from '../../service/API/medical-consultations';
import useReRender from '../../hooks/useReRender';

function AddConsultModal({
  modalState,
  setModalState,
}) {
  const { coolClearToken, user } = useAuth();
  const {
    setReRender,
    forceReRender,
  } = useReRender();
  const { enqueueSnackbar } = useSnackbar();
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [inputs, setInputs] = useState({ nome: '', date: '', type: 'Primeira' });
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState({});
  useEffect(async () => {
    if (coolClearToken) {
      const response = await fetchSpeechTherapist({
        token: coolClearToken,
        speech_therapist_id: user.speech_therapist.id,
      });
      if (response.status === 200) {
        const speechPatients = response.data.speech_patients.map((item) => ({
          key: item.id,
          label: `${item.patient.first_name} ${item.patient.last_name}`,
        }));
        // console.log('filtered',speechPatients);
        setPatients(speechPatients);
      }
    }
  }, [coolClearToken]);

  const confirmAction = async () => {
    setLoadingAdd(true);
    if (selectedPatient && inputs.date !== '' && inputs.type !== '') {
      const objectApi = {
        date: inputs.date,
        type: inputs.type,
        status: 'Agendada',
        speech_therapist_patient_id: selectedPatient.key,
      };
      const response = await addConsult({ token: coolClearToken, object: objectApi });
      if (response.status === 200) {
        enqueueSnackbar('Consulta adicionada com sucesso', { variant: 'success' });
        setReRender(true);
      } else {
        enqueueSnackbar('Não foi possível inserir sua consulta, tente novamente!', { variant: 'error' });
      }
    } else {
      enqueueSnackbar('Favor preencher todos os campos!', { variant: 'error' });
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
      title="Marcar consulta"
    >
      <FormGroup row>
        <DatalistInput
          id="vincularPaciente"
          placeholder="Buscar paciente"
          items={patients}
          setSelectedState={setSelectedPatient}
          label="Paciente"
          idNotInt
        />
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
              Primeira
            </option>
            <option>
              Retorno
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
