/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Row, Col, Card, Input, ListGroup, ListGroupItem, Button,
} from 'reactstrap';
import CardConsultBase from '../../components/Card/ConsultPage/CardConsultBase';
import CardLastsConsults from '../../components/Card/ConsultPage/CardLastsConsults';
import CardLastSends from '../../components/Card/ConsultPage/CardLastSends';
import CardPacient from '../../components/Card/ConsultPage/CardPacient';
import CardSelectedActivities from '../../components/Card/ConsultPage/CardSelectedActivities';
import Main from '../../components/layout/Main';
import { mocks } from '../../mocks';

function PacienteDetalhe() {
  const [games, setGames] = useState([
    {
      id: 1, nome: 'Ligue o som', maxLevel: '1', selected: false,
    },
    {
      id: 2, nome: 'Som animal', maxLevel: '1', selected: false,
    },
    {
      id: 3, nome: 'Para-Escuta-Para', maxLevel: '1', selected: true,
    },
  ]);

  return (
    <div style={{ marginTop: '50px' }}>
      <Card body>
        <Row>
          <Col>
            <CardPacient editButton pacientData={mocks.pacientData} />
          </Col>
          <Col>
            <CardLastsConsults />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <CardSelectedActivities />
          </Col>
          <Col>
            <CardLastSends />
          </Col>
        </Row>
        <Row className="mt-3 mb-3">
          <Col>
            gráficos de desempenho
          </Col>

        </Row>
      </Card>

    </div>
  );
}
PacienteDetalhe.layout = Main;
export default PacienteDetalhe;
