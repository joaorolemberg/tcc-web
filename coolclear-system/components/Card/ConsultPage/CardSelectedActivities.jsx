import React, { useEffect } from 'react';
import {
  Card, Row, Col, ListGroup, ListGroupItem,
} from 'reactstrap';
import useAuth from '../../../hooks/useAuth';
import useConsult from '../../../hooks/useConsult';

function CardSelectedActivities() {
  const { coolClearToken } = useAuth();
  const { consult } = useConsult();
  useEffect(async () => {
    if (coolClearToken && consult) {

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
        <ListGroup className="p-3">
          <ListGroupItem>
            <Row>
              <Col xs={1}>
                <i className="fa fa-flag" />
              </Col>
              <Col xs={11} className="text-center">
                Som animal
              </Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <Row>
              <Col xs={1}>
                <i className="fa fa-flag" />
              </Col>
              <Col xs={11} className="text-center">
                Ligue o som!
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
        {' '}

      </Row>

    </Card>

  );
}

export default CardSelectedActivities;
