/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Card, Col, Row,
} from 'reactstrap';
import BaseModal from '../Modal/BaseModal';

const ListItemActivity = function a({ data }) {
  const [modalState, setModalState] = useState(false);
  return (
    <div>
      <Card body onClick={() => setModalState(true)}>
        <Row>
          <Col>
            {data.name}
          </Col>
        </Row>
      </Card>
      <BaseModal
        modalState={modalState}
        setModalState={setModalState}
        title={data.name}
        size="md"
        Body={() => (
          <div>
            <Row>
              Descrição:

            </Row>
            <Row>
              <Col>
                {data.description}
              </Col>
            </Row>
            <Row className="mt-3">
              Métricas:
            </Row>
            <Row>
              {data.metrics.map((metric) => (
                <Col className="mt-2" key={metric.id} xl={12}>
                  {metric.name}
                  :
                  {metric.description}
                </Col>
              ))}
            </Row>
            <Row className="mt-3">
              {`Número de níveis de dificuldade: ${data.number_of_difficulty_levels}`}
            </Row>
          </div>

        )}
      />
    </div>

  );
};

export default ListItemActivity;
