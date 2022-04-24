/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Row, Col, Card, Input, ListGroup, ListGroupItem, Button, Spinner,
} from 'reactstrap';
import CardConsultBase from '../../components/Card/ConsultPage/CardConsultBase';
import CardLastsConsults from '../../components/Card/ConsultPage/CardLastsConsults';
import CardLastSends from '../../components/Card/ConsultPage/CardLastSends';
import CardPacient from '../../components/Card/ConsultPage/CardPacient';
import CardSelectedActivities from '../../components/Card/ConsultPage/CardSelectedActivities';
import ActivityGraph from '../../components/Graphs/ActivityGraph';
import Main from '../../components/layout/Main';
import useAuth from '../../hooks/useAuth';
import { mocks } from '../../mocks';
import { fetchActivities } from '../../service/API/activities';
import { fetchPatient } from '../../service/API/pacients';

function PacienteDetalhe() {
  const { coolClearToken } = useAuth();
  const { push, query } = useRouter();
  const [loading, setLoading] = useState(true);

  const [pacient, setPacient] = useState({});
  const [activities, setActivities] = useState([]);

  useEffect(async () => {
    setLoading(true);
    if (coolClearToken && query.pacienteDetalhe) {
      const response = await fetchPatient({
        token: coolClearToken,
        pacient_id: query.pacienteDetalhe,
      });
      const response2 = await fetchActivities({
        token: coolClearToken,
      });
      if (response.status === 200 && response2.status === 200) {
        setPacient(response.data);
        setActivities(response2.data);
        setLoading(false);
      }
      // const response2 = await fetchActivities({ token: coolClearToken });
      // if (response.status === 200 && response2.status === 200) {
      //   // console.log(response2.data);
      //   const gamesApi = response2.data.map((item) => ({
      //     id: item.id,
      //     nome: item.name,
      //     maxLevel: item.number_of_difficulty_levels,
      //     selectedDifficulty: 1,
      //     selected: false,
      //   }));
      //   setGames(gamesApi);
      //   setConsult(response.data);
      //   // setConsultData(response.data);
      //   setLoading(false);
      // }
    }
  }, [coolClearToken, query]);
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
      <Card body>
        <Row>
          <Col>
            <CardPacient editButton pacientData={pacient} />
          </Col>
          <Col>
            <CardLastsConsults allConsults />
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
      </Card>

    </div>
  );
}
PacienteDetalhe.layout = Main;
export default PacienteDetalhe;
