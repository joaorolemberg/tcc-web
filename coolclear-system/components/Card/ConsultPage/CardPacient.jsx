/* eslint-disable react/prop-types */
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import {
  Card, Row, Col, Button,
} from 'reactstrap';
import EditPacientModal from '../../Modal/EditPacientModal';
import { idade } from '../../../service/functionsAndTypes';

function CardPacient({ pacientData, editButton }) {
  const [modalState, setModalState] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const { enqueueSnackbar } = useSnackbar();

  const confirmAction = () => {
    enqueueSnackbar('Paciente editado com sucesso', { variant: 'success' });
  };
  const declineAction = () => {
    setModalState(false);
  };

  if (editButton) {
    return (
      <>
        <Card body style={{ backgroundColor: '#CBDFCC', height: '100%' }}>
          <Row style={{ height: '100%' }}>
            <Col lg={2} className="text-center align-self-center">
              {pacientData.sexo === 'M' ? <i className="fas fa-male fa-5x" /> : <i className="fas fa-female fa-5x" />}
            </Col>
            <Col lg={10}>
              <Row>
                <Col xl={11} xs={10} className="text-center">
                  <div style={{ fontSize: '1.4em' }}>
                    {pacientData.nome}
                  </div>
                </Col>
                <Col xl={1} xs={2} className="text-center">
                  <Button
                    size="sm"
                    color="success"
                    onClick={() => { setModalState(true); }}
                  >
                    <span>
                      <i className="fa fa-pencil-alt text-white" />
                    </span>
                  </Button>
                </Col>
                <Col xl={8} lg={12} md={12}>
                  <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <i className="fas fa-user-shield" />
                    {' '}
                    {pacientData.responsavel.nome}

                  </div>
                </Col>
                <Col xl={4} lg={8} md={8} xs={8}>
                  <i className="fas fa-clipboard-list" />
                  {pacientData.prontuario}
                </Col>
                <Col xl={6} lg={8} md={8}>
                  Nascimento:
                  {format(parseISO(pacientData.dataNascimento), "dd'/'MM'/'yyyy ")}
                </Col>
                <Col xl={4} lg={4} md={4}>
                  Idade:
                  {idade(pacientData.dataNascimento)}
                </Col>

              </Row>

            </Col>
          </Row>
        </Card>
        <EditPacientModal
          confirmAction={{ action: confirmAction, label: 'Editar' }}
          declineAction={{ action: declineAction, label: 'Cancelar' }}
          modalState={modalState}
          setModalState={setModalState}
          data={pacientData}
        />
      </>
    );
  }
  return (
    <Card body style={{ backgroundColor: '#CBDFCC', height: '100%' }}>
      <Row style={{ height: '100%' }}>
        <Col lg={2} className="text-center align-self-center">
          {pacientData.sexo === 'M' ? <i className="fas fa-male fa-5x" /> : <i className="fas fa-female fa-5x" />}
        </Col>
        <Col lg={10}>
          <Row>
            <Col xl={12} xs={12} className="text-center">
              <div style={{ fontSize: '1.4em' }}>
                {pacientData.nome}
              </div>
            </Col>
            <Col xl={8} lg={12} md={12}>
              <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                <i className="fas fa-user-shield" />
                {' '}
                {pacientData.responsavel.nome}
              </div>
            </Col>
            <Col xl={4} lg={8} md={8} xs={8}>
              <i className="fas fa-clipboard-list" />
              {pacientData.prontuario}
            </Col>
            <Col xl={6} lg={8} md={8}>
              Nascimento:
              {format(parseISO(pacientData.dataNascimento), "dd'/'MM'/'yyyy  HH':'mm ")}
            </Col>
            <Col xl={4} lg={4} md={4}>
              Idade:
              {idade(pacientData.dataNascimento)}
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}
export default CardPacient;
