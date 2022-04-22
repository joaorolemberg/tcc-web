/* eslint-disable react/prop-types */
import React from 'react';
import { Col, ListGroupItem, Row } from 'reactstrap';

function SmallListItem({ data }) {
  return (
    <ListGroupItem>
      <Row>
        <Col xs={1}>
          <i className="fa fa-user" />
        </Col>
        <Col xs={11} className="text-center">
          {data.paciente.nome}
        </Col>
      </Row>
    </ListGroupItem>

  );
}

export default SmallListItem;
