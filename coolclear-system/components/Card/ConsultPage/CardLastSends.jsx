/* eslint-disable no-unused-vars */
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Card, Row, Col, ListGroup, ListGroupItem,
} from 'reactstrap';
import useAuth from '../../../hooks/useAuth';
import useConsult from '../../../hooks/useConsult';
import { fetchActivities, fetchAssignments } from '../../../service/API/activities';
import { fetchPerformance } from '../../../service/API/graphData';
import SmallListItemActivity from '../../List/SmallListItemActivity';

function CardLastSends() {
  const { coolClearToken } = useAuth();
  const { consult } = useConsult();
  const { query } = useRouter();
  const [lastsSends, setLastsSends] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(async () => {
    if (coolClearToken) {
      if (consult) {
        // const response = await fetchMedicalConsultations({
        //   token: coolClearToken,
        //   patient_id: consult.paciente.idPacient,
        // });
        // if (response.status === 200) {
        //   const lasts = response.data.filter((item) => {
        //     if (item.id !== consult.id) {
        //       return true;
        //     }
        //     return false;
        //   });
        //   setLastsConsults(lasts);
        // }
      } else {
        setLoading(true);
        const activityRegister = [];
        setLastsSends((currState) => ([]));

        const response1 = await fetchActivities({
          token: coolClearToken,
        });
        if (response1.status === 200) {
          response1.data.map(async (item) => {
            const response2 = await fetchPerformance({
              patient_id: query.pacienteDetalhe,
              activity_id: item.id,
              token: coolClearToken,
            });
            if (response2.status === 200) {
              const data = { nome: item.name, number: response2.data.length };
              setLastsSends((currState) => ([...currState, data]));
            }
          });
        }
        setLoading(false);
      }
    }
  }, [coolClearToken, consult]);
  return (
    <Card body style={{ backgroundColor: '#CBDFCC', height: '100%' }}>
      <Row style={{ height: '100%' }}>

        <Row className="text-center">
          <div style={{ fontSize: '1.4em' }}>
            Todos os envios
          </div>
        </Row>
        {loading ? 'Carregando'
          : (
            <ListGroup className="p-3">
              {lastsSends.map((item) => (
                <ListGroupItem key={item.name}>
                  <Row>
                    <Col xs={1}>
                      <i className="fa fa-flag" />
                    </Col>
                    <Col xs={10} className="text-center">
                      {item.nome}
                    </Col>
                    <Col xs={1}>
                      {item.number}
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}

        <Row className="justify-content-end">
          <Link href="/dashboard">Estatística detalhada</Link>
        </Row>

      </Row>

    </Card>

  );
}

export default CardLastSends;
