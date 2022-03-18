/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
import { format, parseISO } from 'date-fns';
import Router from 'next/router';
import React, { useState } from 'react';
import {
  Button, Row, Col, FormGroup, Input, Label,
} from 'reactstrap';
import { tiposConsulta, tiposStatus } from '../../service/functionsAndTypes';
import BaseModal from './BaseModal';

const CheckConsultaModal = function b({
  modalState,
  setModalState,
  consultData,
}) {
  const [inputDate, setInputDate] = useState(consultData.data);
  const [buttonReplace, setButtonReplace] = useState({ label: 'Remarcar consulta', state: 'date' });
  const HandleChangeDate = () => {
    if (buttonReplace.state === 'date') {
      setButtonReplace({ label: 'Confirmar data', state: 'input' });
    } else {
      // alterar para data escolhida
      setButtonReplace({ label: 'Remarcar consulta', state: 'date' });
    }
  };
  const HandleCancel = () => {
    const r = confirm('Você deseja cancelar a consulta? Essa ação não pode ser desfeita!');
    if (r) {
      console.log('cancelou mermo');
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
            {buttonReplace.state === 'date'
              ? (
                <>
                  Data:
                  {' '}
                  {format(parseISO(consultData.data), "dd'/'MM'/'yyyy 'às' HH':'MM")}
                </>
              )
              : (
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
            {`Status: ${tiposStatus[consultData.status].label}`}
          </Row>
          <Row className="justify-content-center">
            {`Tipo: ${tiposConsulta[consultData.tipo]}`}
          </Row>
        </>
      )}
      Footer={() => (
        <Row className="justify-content-center text-center mb-3">
          <Col>
            <Button size="sm" type="button" onClick={() => Router.push(`/consulta/${consultData.id}`)} color="success">Iniciar atendimento</Button>
          </Col>
          <Col>
            <Button size="sm" type="button" onClick={() => HandleChangeDate()} color="warning">
              {buttonReplace.label}
            </Button>
          </Col>
          <Col>
            <Button size="sm" type="button" onClick={() => HandleCancel()} color="danger">Cancelar consulta</Button>
          </Col>

        </Row>

      )}
    />
  );
};

export default CheckConsultaModal;
