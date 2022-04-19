/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react';
import {
  Card,
  Col, Input, Row, Label, FormGroup,
} from 'reactstrap';
import Router from 'next/router';
import MainCard from '../../components/Card/MainCard';
import Main from '../../components/layout/Main';
import ComponentRowList from '../../components/List/ComponentRowList';
import ListItemPaciente from '../../components/List/ListItemPaciente';
import { fetchPatients } from '../../service/API/pacients';
import useAuth from '../../hooks/useAuth';
import { fetchActivities } from '../../service/API/activities';
import { fetchSpeechTherapist } from '../../service/API/speech-therapists';
import DatalistInput from '../../components/List/DatalistInput';

const Dashboard = function b() {
  const { coolClearToken, user } = useAuth();

  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [selectedMetric, setSelectedMetric] = useState({});
  const [selectedPatient, setSelectedPatient] = useState({});

  const metricOptions = useMemo(() => {
    if (selectedActivity === '') {
      return [];
    }
    const options = activities.filter((activity) => {
      if (activity.id === selectedActivity) {
        return true;
      }
      return false;
    });
    return options[0].metrics;
    // return selectedActivity.me
  }, [selectedActivity]);

  useEffect(async () => {
    if (coolClearToken) {
      setLoading(true);
      const responsePatients = fetchSpeechTherapist({
        token: coolClearToken,
        speech_therapist_id: user.speech_therapist.id,
      });
      const responseActivities = fetchActivities({
        token: coolClearToken,
      });
      await Promise.all([responseActivities, responsePatients])
        .then((responses) => {
          if (responses[0].status === 200 && responses[1].status === 200) {
            setActivities(responses[0].data);
            setPatients(responses[1].data.speech_patients.map((item) => ({
              key: item.id,
              label: `${item.patient.first_name} ${item.patient.last_name}`,
            })));
            setLoading(false);
          }
        });
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
            <DatalistInput
              id="vincularPaciente"
              placeholder="Buscar paciente"
              items={patients}
              setSelectedState={setSelectedPatient}
              label="Paciente"
              idNotInt
            />
          </Row>
        </Col>
        <Col className="p-3">
          <Row>
            <Col sm={2}>
              <Label sm={2} for="selectedActivity">Atividades:</Label>
            </Col>
            <Col sm={10}>
              <Input
                id="selectActivity"
                name="select"
                type="select"
                onChange={(e) => { setSelectedActivity(e.target.value); }}
              >
                <option disabled selected value> -- selecione -- </option>
                <option disabled value="all"> Todas </option>
                {activities.map((activity) => (
                  <option key={activity.id} value={activity.id}>
                    {activity.name}
                  </option>
                ))}
              </Input>
            </Col>
          </Row>
          <Row>
            <Col sm={2}>
              <Label sm={2} for="selectedMetric">Métricas:</Label>
            </Col>
            <Col sm={10}>
              <Input
                id="selectedMetric"
                name="select"
                type="select"
                onChange={(e) => { setSelectedMetric(e.target.value); }}
                disabled={selectedActivity === ''}
              >
                <option disabled selected value> -- selecione -- </option>
                <option value="all"> Todas </option>
                { selectedActivity !== '' ? metricOptions.map((metric) => (
                  <option key={metric.id} value={metric.id}>
                    {metric.name}
                  </option>
                ))
                  : <div />}
              </Input>
            </Col>
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
