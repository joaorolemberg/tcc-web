/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import Router from 'next/router';
import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import BaseModal from '../Modal/BaseModal';

const ListItemFono = function a({ data }) {
  const [modalState, setModalState] = useState(false);
  return (
    <div>
      <div
        className="p-1"
        // onClick={() => (setModalState(true))}
      >
        <Row>
          <Col xl={9} md={8} xs={7} className="align-self-center">
            <Row>
              <Col style={{ fontSize: '1.2em' }}>
                <div
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {`${data.user.first_name} ${data.user.last_name}`}
                </div>
              </Col>
            </Row>
            <Row>
              <Col style={{ color: 'grey' }}>
                CRFa:
                {'  '}
                {data.CRFa}
              </Col>
            </Row>
          </Col>
          <Col xl={2} md={3} xs={3} className="align-self-center">
            <Row className="justify-content-center mb-2">
              <Col>
                <div
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  Pacientes:
                  {' '}
                  {data.speech_patients.length}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      {/* <BaseModal
        title={}
        modalState={modalState}
        setModalState={setModalState}
        Body={() => (
          <div>Teste</div>
        )}
      /> */}
    </div>
  );
};

export default ListItemFono;
