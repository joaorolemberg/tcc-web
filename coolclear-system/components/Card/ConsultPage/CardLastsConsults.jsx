import React from 'react';
import { Card, Row, Col } from 'reactstrap';

function CardLastsConsults() {
  return (
    <Card body style={{ backgroundColor: '#CBDFCC', height: '100%' }}>
      <Row style={{height:'100%'}}>

        <Row className="text-center">
          <div style={{ fontSize: '1.4em' }}>
            Consultas anteriores
            {' '}
          </div>
        </Row>
        <Row className="text-center">
          <Col>
            10/01/2020  Observações
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            10/01/2020  Observações
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            10/01/2020  Observações
          </Col>
        </Row>
        {' '}

      </Row>

    </Card>

  );
}

export default CardLastsConsults;
