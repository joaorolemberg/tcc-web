/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import Router from 'next/router';
import React from 'react';
import { Col, Row } from 'reactstrap';

const ListItemPaciente = function a({ data }) {
  return (
    <div>
      <div
        onClick={() => {
          Router.push(`/paciente/${data.id}`);
        }}
        className="p-1"
      >
        <Row>
          <Col xl={1} md={1} xs={2} className="align-self-center text-center">
            <span>
              {data.sexo === 'F' ? (
                <i className="fas fa-female fa-2x" />
              ) : (
                <i className="fas fa-male fa-2x" />
              )}
            </span>
          </Col>
          <Col xl={9} md={8} xs={7} className="align-self-center">
            <Row>
              <Col style={{ fontSize: '1.2em' }}>
                <div
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {data.nome}
                </div>
              </Col>
            </Row>
            <Row>
              <Col style={{ color: 'grey' }}>
                <i className="fas fa-user-shield" />
                {'  '}
                {data.responsavel.nome}
              </Col>
            </Row>
          </Col>
          <Col xl={2} md={3} xs={3} className="align-self-center">
            <Row className="justify-content-center mb-2">
              <Col>
                <div
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  Prontuário
                </div>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col>
                <div
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {data.prontuario}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ListItemPaciente;
