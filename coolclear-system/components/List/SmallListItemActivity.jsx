/* eslint-disable react/prop-types */
import React from 'react';
import { Col, ListGroupItem, Row } from 'reactstrap';

export default function SmallListItemActivity({ game }) {
  return (
    <ListGroupItem>
      <Row>
        <Col xs={1}>
          <i className="fa fa-flag" />
        </Col>
        <Col xs={11} className="text-center">
          {game.name}
        </Col>
      </Row>
    </ListGroupItem>
  );
}
