/* eslint-disable no-unused-vars */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Card, Row, Col, ListGroup, ListGroupItem,
} from 'reactstrap';
import useAuth from '../../../hooks/useAuth';
import useConsult from '../../../hooks/useConsult';
import { fetchAssignments } from '../../../service/API/activities';
import SmallListItemActivity from '../../List/SmallListItemActivity';

function CardSelectedActivities() {
  const { coolClearToken } = useAuth();
  const { consult } = useConsult();
  const { query } = useRouter();
  const [selectedActivities, setSelectedActivities] = useState([]);
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
        const response = await fetchAssignments({
          token: coolClearToken,
          patient_id: query.pacienteDetalhe,
        });
        if (response.status === 200) {
          console.log(response);
          setSelectedActivities(response.data);
        }
      }
    }
  }, [coolClearToken, consult]);
  return (
    <Card body style={{ backgroundColor: '#CBDFCC', height: '100%' }}>
      <Row style={{ height: '100%' }}>

        <Row className="text-center">
          <div style={{ fontSize: '1.4em' }}>
            Atividades selecionadas
          </div>
        </Row>
        {selectedActivities.length !== 0
          ? (
            <ListGroup className="p-3">
              {selectedActivities.map((item) => (
                <SmallListItemActivity key={item.activity_id} game={item.activity} />
              ))}
            </ListGroup>
          )
          : <div> Não há atividades atribuídas</div>}
        {' '}
      </Row>

    </Card>

  );
}

export default CardSelectedActivities;
