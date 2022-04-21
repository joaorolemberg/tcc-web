/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import { format, parseISO } from 'date-fns';
import React, { useState } from 'react';
import {
  Col, Row, Badge,
} from 'reactstrap';
import { tiposStatus } from '../../service/functionsAndTypes';
import CheckConsultaModal from '../Modal/CheckConsultaModal';

const ListItemConsulta = function a({ data, small }) {
  const [modalState, setModalState] = useState(false);
  if (small) {
    return (
      <div>
        <div className="p-1">
          <Row>
            <Col xl={1} md={1} xs={2} className="align-self-center text-center">
              <span>
                {data.paciente.sexo === 'F' ? (
                  <i className="fas fa-female fa-2x" />
                ) : (
                  <i className="fas fa-male fa-2x" />
                )}
              </span>
            </Col>
            <Col xl={7} md={6} xs={10} className="align-self-center">
              <Row>
                <Col style={{ fontSize: '1.2em' }}>{data.paciente.nome}</Col>
              </Row>
              <Row>
                <Col style={{ color: 'grey' }}>
                  <i className="fas fa-user-shield" />
                  {'  '}
                  {data.responsavel.nome}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div
        onClick={() => {
          if (data.status === 'Agendada') {
            setModalState(true);
          }
        }}
        className="p-1"
      >
        <Row>
          <Col xl={1} md={1} xs={2} className="align-self-center text-center">
            <span>
              {data.paciente.sexo === 'F' ? (
                <i className="fas fa-female fa-2x" />
              ) : (
                <i className="fas fa-male fa-2x" />
              )}
            </span>
          </Col>
          <Col xl={7} md={6} xs={10} className="align-self-center">
            <Row>
              <Col style={{ fontSize: '1.2em' }}>{data.paciente.nome}</Col>
            </Row>
            <Row>
              <Col style={{ color: 'grey' }}>
                <i className="fas fa-user-shield" />
                {'  '}
                {data.responsavel.nome}
              </Col>
            </Row>
          </Col>
          <Col xl={2} md={2} xs={6} className="align-self-center">
            <Row className="justify-content-center">
              {format(parseISO(data.data), "dd'/'MM'/'yyyy ")}
            </Row>
          </Col>
          <Col xl={2} md={3} xs={6} className="align-self-center">
            <Row className="justify-content-center mb-2">
              <Badge color="secondary">{data.tipo}</Badge>
            </Row>
            <Row className="justify-content-center">
              <Badge color={tiposStatus[data.status]}>
                {data.status}
              </Badge>
            </Row>
          </Col>
        </Row>
        <CheckConsultaModal
          modalState={modalState}
          setModalState={setModalState}
          consultData={data}
        />
      </div>
    </div>
  );
};

export default ListItemConsulta;
