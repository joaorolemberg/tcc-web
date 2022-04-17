/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Card,
  Col, Input, Row,
} from 'reactstrap';
import Router from 'next/router';
import MainCard from '../../components/Card/MainCard';
import Main from '../../components/layout/Main';
import ComponentRowList from '../../components/List/ComponentRowList';
import ListItemPaciente from '../../components/List/ListItemPaciente';
import { fetchPatients } from '../../service/API/pacients';
import useAuth from '../../hooks/useAuth';

const Dashboard = function b() {
  const { coolClearToken, user } = useAuth();

  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const [pacients, setPacients] = useState([]);

  useEffect(async () => {
    if (coolClearToken) {
      setLoading(true);
      let response = {};
      response = await fetchPatients({
        token: coolClearToken,
      });
      if (response.status === 200) {
        setPacients(response.data);
      }
      setLoading(false);
    }
  }, [coolClearToken, user]);

  if (loading) {
    return <div> carregando</div>;
  }
  return (
    <div style={{ marginTop: '50px' }}>
      <Row className="justify-content-center">
        <Col className="text-center">
          <h2>Dashboard</h2>
        </Col>
      </Row>

      <Row>
        <Col>
          <Row className="p-3">
            <Input placeholder="Paciente" />
          </Row>
        </Col>
        <Col className="p-3">
          <Row className="mb-3">
            <Input placeholder="Atividade" />
          </Row>
          <Row>
            <Input placeholder="Métrica" />
          </Row>
        </Col>
      </Row>
      <Card body>
        <Row>
          <Col className="text-center">Gráfico do paciente</Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            Gráfico 1
          </Col>
          <Col className="text-center">
            Gráfico 2
          </Col>
          <Col className="text-center">
            Gráfico 3
          </Col>
        </Row>
      </Card>

      <Card body>
        <Row>
          <Col className="text-center">Gráfico geral</Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            Gráfico 1
          </Col>
          <Col className="text-center">
            Gráfico 2
          </Col>
          <Col className="text-center">
            Gráfico 3
          </Col>
        </Row>
      </Card>

    </div>
  );
};

Dashboard.layout = Main;
export default Dashboard;
