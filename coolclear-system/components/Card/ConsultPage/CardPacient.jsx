import React from 'react';
import { Card, Row, Col } from 'reactstrap';

function CardPacient({ pacientData }) {
  return (
    <Card body style={{ backgroundColor: '#CBDFCC', height: '100%' }}>
      <Row style={{height:'100%'}}>
        <Col lg={2} className="text-center align-self-center">
          <i className="fas fa-male fa-5x" />
        </Col>
        <Col lg={10}>
          <Row>
            <Col xl={12} xs={12} className="text-center">
              <div style={{ fontSize: '1.4em' }}>
                João Pedro Souza Rolemberg
              </div>
            </Col>
            <Col xl={8} lg={12} md={12}>
              <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                <i className="fas fa-user-shield" />
                {' '}
                João Pedro Souza Rolemberg
              </div>
            </Col>
            <Col xl={4} lg={8} md={8} xs={8}>
              <i className="fas fa-clipboard-list" />
              13456789
            </Col>
            <Col xl={2} lg={4} md={4} xs={4}>
              <i className="fas fa-mars" />
              <i className="fas fa-venus" />
            </Col>

            <Col xl={6} lg={8} md={8}>
              Nascimento: 08/01/1999
            </Col>
            <Col xl={4} lg={4} md={4}>
              Idade: 23
            </Col>

          </Row>

        </Col>
      </Row>

    </Card>
  );
}
export default CardPacient;
