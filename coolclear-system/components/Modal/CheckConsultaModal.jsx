/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
import { format, parseISO } from 'date-fns';
import Router from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import {
  Button, Row, Col, FormGroup, Input, Label,
} from 'reactstrap';
import useAuth from '../../hooks/useAuth';
import useReRender from '../../hooks/useReRender';
import { editMedicalConsultation } from '../../service/API/medical-consultations';
import BaseModal from './BaseModal';

const CheckConsultaModal = function b({
  modalState,
  setModalState,
  consultData,
}) {
  const { coolClearToken } = useAuth();
  const { setReRender } = useReRender();
  const { enqueueSnackbar } = useSnackbar();
  const [inputDate, setInputDate] = useState(consultData.data);
  const [buttonReplace, setButtonReplace] = useState({
    label: 'Remarcar consulta',
    state: 'date',
  });
  const HandleChangeDate = async () => {
    if (buttonReplace.state === 'date') {
      setButtonReplace({ label: 'Confirmar data', state: 'input' });
    } else {
      // alterar para data escolhida
      // eslint-disable-next-line no-lonely-if
      if (inputDate === consultData.data) {
        setButtonReplace({ label: 'Remarcar consulta', state: 'date' });
      } else {
        const objectApi = {
          date: inputDate,
        };
        const response = await editMedicalConsultation({
          token: coolClearToken,
          id: consultData.id,
          objectApi,
        });
        if (response.status === 200) {
          setReRender(true);
          // eslint-disable-next-line no-param-reassign
          consultData.data = inputDate;
          enqueueSnackbar('Consulta remarcada com sucesso', {
            variant: 'success',
          });
          setButtonReplace({ label: 'Remarcar consulta', state: 'date' });
        } else {
          enqueueSnackbar(
            'Não foi possível remarcar consulta, tente novamente',
            { variant: 'error' },
          );
        }
      }
    }
  };
  const HandleCancel = async () => {
    const r = confirm(
      'Você deseja cancelar a consulta? Essa ação não pode ser desfeita!',
    );
    if (r) {
      const objectApi = {
        status: 'Cancelada',
      };
      const response = await editMedicalConsultation({
        token: coolClearToken,
        id: consultData.id,
        objectApi,
      });
      if (response.status === 200) {
        setReRender(true);
        // eslint-disable-next-line no-param-reassign
        enqueueSnackbar('Consulta cancelada com sucesso', {
          variant: 'success',
        });
        consultData.status = 'Cancelada';
        setModalState(false);
      } else {
        enqueueSnackbar(
          'Não foi possível cancelar a consulta, tente novamente',
          { variant: 'error' },
        );
      }
    } else {
      console.log('cancelou o cancelamento');
    }
  };

  return (
    <BaseModal
      modalState={modalState}
      setModalState={setModalState}
      title={consultData.paciente.nome}
      size="mb"
      Body={() => (
        <>
          <Row className="justify-content-center">
            {buttonReplace.state === 'date' ? (
              <>
                Data:
                {' '}
                {format(
                  parseISO(consultData.data),
                  "dd'/'MM'/'yyyy 'às' HH':'mm",
                )}
              </>
            ) : (
              <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                  Data:
                </Label>
                <Col sm={10}>
                  <Input
                    id="exampleDate"
                    name="date"
                    type="datetime-local"
                    onChange={(e) => setInputDate(e.target.value)}
                    value={inputDate}
                    required
                  />
                </Col>
              </FormGroup>
            )}
          </Row>
          <Row className="justify-content-center">
            {`Status: ${consultData.status}`}
          </Row>
          <Row className="justify-content-center">
            {`Tipo: ${consultData.tipo}`}
          </Row>
        </>
      )}
      Footer={() => (
        <Row className="justify-content-center text-center mb-3">
          <Col>
            <Button
              size="sm"
              type="button"
              onClick={() => Router.push(`/consulta/${consultData.id}`)}
              color="success"
            >
              Iniciar atendimento
            </Button>
          </Col>
          <Col>
            <Button
              size="sm"
              type="button"
              onClick={() => HandleChangeDate()}
              color="warning"
            >
              {buttonReplace.label}
            </Button>
          </Col>
          <Col>
            <Button
              size="sm"
              type="button"
              onClick={() => HandleCancel()}
              color="danger"
            >
              Cancelar consulta
            </Button>
          </Col>
        </Row>
      )}
    />
  );
};

export default CheckConsultaModal;
