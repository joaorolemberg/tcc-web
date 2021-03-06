/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Card,
  Col, Input, Row, Label, FormGroup, Spinner, Button,
} from 'reactstrap';
import Router from 'next/router';
import { useReactToPrint } from 'react-to-print';
import MainCard from '../../components/Card/MainCard';
import Main from '../../components/layout/Main';
import ComponentRowList from '../../components/List/ComponentRowList';
import ListItemPaciente from '../../components/List/ListItemPaciente';
import { fetchPatients } from '../../service/API/pacients';
import useAuth from '../../hooks/useAuth';
import { fetchActivities } from '../../service/API/activities';
import { fetchSpeechTherapist } from '../../service/API/speech-therapists';
import DatalistInput from '../../components/List/DatalistInput';
import ActivityGraph from '../../components/Graphs/ActivityGraph';
import useGraphData from '../../hooks/useGraphData';
import GraphsRow from '../../components/Graphs/GraphsRow';

const Dashboard = function b() {
  const { coolClearToken, user } = useAuth();
  const {
    handleGraph,
    enabled,
    setEnabled,
    loadingGraphs,
    setToken,
    loadingGraphsAllPatients,
    averagePatient,
    averageAllPatients,
  } = useGraphData();
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState('');
  // const [selectedMetric, setSelectedMetric] = useState('');
  const [selectedPatient, setSelectedPatient] = useState({});

  useEffect(async () => {
    if (coolClearToken) {
      setToken(coolClearToken);
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
              key: item.patient_id,
              label: `${item.patient.first_name} ${item.patient.last_name}`,
            })));
            setLoading(false);
          }
        });
    }
  }, [coolClearToken, user]);

  useEffect(() => {
    if (selectedPatient.key && selectedActivity !== '') {
      handleGraph(selectedPatient.key, selectedActivity, activities);
    } else {
      setEnabled(false);
    }
  }, [selectedPatient, selectedActivity]);

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
            <Col>
              <Label for="selectedActivity">Atividades:</Label>
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
        </Col>
      </Row>
      {enabled
        ? (
          <div>
            {loadingGraphs ? (
              <div>
                <Row className="justify-content-center">
                  <Spinner />
                </Row>
              </div>
            )
              : (
                <div>
                  <Card body>
                    <Row>
                      <Col className="text-center">Gr??fico do paciente</Col>
                    </Row>
                    <Row>
                      <Col className="text-center">{averagePatient ? `Desempenho m??dio calculado: ${averagePatient}` : <div />}</Col>
                    </Row>
                    <GraphsRow allPatients={false} />
                  </Card>
                  {loadingGraphsAllPatients ? (
                    <Row className="justify-content-center">
                      <Spinner />
                    </Row>
                  )
                    : (
                      <Card body className="mt-3 mb-3">
                        <Row>
                          <Col className="text-center">Gr??fico Geral </Col>
                        </Row>
                        <Row>
                          <Col className="text-center">{averageAllPatients ? `Desempenho m??dio calculado: ${averageAllPatients}` : <div />}</Col>
                        </Row>
                        <GraphsRow allPatients />
                      </Card>
                    )}
                </div>
              )}
          </div>
        )
        : (
          <div>
            <Row className="text-center">
              <h3>Por favor selecione todos os par??metros para visualizar os gr??ficos</h3>
            </Row>
          </div>
        )}
    </div>
  );
};

Dashboard.layout = Main;
export default Dashboard;
