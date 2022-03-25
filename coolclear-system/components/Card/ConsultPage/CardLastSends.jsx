import React from 'react';
import {
  Card, Row, Col, ListGroup, ListGroupItem,
} from 'reactstrap';

function CardLastSends() {
  return (
    <Card body style={{ backgroundColor: '#CBDFCC', height: '100%' }}>
      <Row style={{ height: '100%' }}>

        <Row className="text-center">
          <div style={{ fontSize: '1.4em' }}>
            Envios após ultima consulta
          </div>
        </Row>
        <ListGroup className="p-3">
          <ListGroupItem>
            <Row>
              <Col xs={1}>
                <i className="fa fa-flag" />
              </Col>
              <Col xs={10} className="text-center">
                Som animal
              </Col>
              <Col xs={1}>
                2
              </Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <Row>
              <Col xs={1}>
                <i className="fa fa-flag" />
              </Col>
              <Col xs={10} className="text-center">
                Ligue o som!
              </Col>
              <Col xs={1}>
                5
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
        <Row className="justify-content-end">
          Estatística detalhada
        </Row>

      </Row>

    </Card>

  );
}

export default CardLastSends;
