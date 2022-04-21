import React, { useState, useEffect } from 'react';
import {
  Col, Row, Spinner,
} from 'reactstrap';
import Router from 'next/router';
import MainCard from '../../components/Card/MainCard';
import Main from '../../components/layout/Main';
import ComponentRowList from '../../components/List/ComponentRowList';
import ListItemPaciente from '../../components/List/ListItemPaciente';
import { fetchPatients } from '../../service/API/pacients';
import useAuth from '../../hooks/useAuth';

const Paciente = function b() {
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
    return (
      <div style={{ marginTop: '50px' }}>
        <Row className="justify-content-center">
          <Spinner size="lg" />
        </Row>
      </div>
    );
  }
  return (
    <div style={{ marginTop: '50px' }}>
      <Row className="justify-content-center">
        <Col xl={10} lg={11} md={11}>
          <MainCard
            add={() => Router.push('/paciente/adicionar')}
            title="Pacientes"
          >
            <ComponentRowList
              list={pacients}
              Component={ListItemPaciente}
            />
          </MainCard>
        </Col>
      </Row>
    </div>
  );
};

Paciente.layout = Main;
export default Paciente;
