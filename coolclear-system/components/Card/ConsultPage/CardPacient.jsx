import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import {
  Card, Row, Col, Button,
} from 'reactstrap';
import EditPacientModal from '../../Modal/EditPacientModal';

function CardPacient({ pacientData, editButton }) {
  const [modalState, setModalState] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const { enqueueSnackbar } = useSnackbar();

  const confirmAction = () => {
    enqueueSnackbar('Paciente editado com sucesso', { variant: 'success' });
  };
  const declineAction = () => {
    setModalState(false);
  };

  if (editButton) {
    return (
      <>
        <Card body style={{ backgroundColor: '#CBDFCC', height: '100%' }}>
          <Row style={{ height: '100%' }}>
            <Col lg={2} className="text-center align-self-center">
              <i className="fas fa-male fa-5x" />
            </Col>
            <Col lg={10}>
              <Row>
                <Col xl={11} xs={10} className="text-center">
                  <div style={{ fontSize: '1.4em' }}>
                    João Pedro Souza Rolemberg
                  </div>
                </Col>
                <Col xl={1} xs={2} className="text-center">
                  <Button
                    size="sm"
                    color="success"
                    onClick={()=>{setModalState(true)}}
                  >
                    <span>
                      <i className="fa fa-pencil-alt text-white" />
                    </span>
                  </Button>
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
        <EditPacientModal
          confirmAction={{ action: confirmAction, label: 'Adicionar' }}
          declineAction={{ action: declineAction, label: 'Cancelar' }}
          modalState={modalState}
          setModalState={setModalState}
          data={pacientData}
        />
      </>
    );
  }
  return (
    <Card body style={{ backgroundColor: '#CBDFCC', height: '100%' }}>
      <Row style={{ height: '100%' }}>
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
