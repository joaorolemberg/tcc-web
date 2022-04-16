import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Row, Col, Card, Input, ListGroup, ListGroupItem, Button, Spinner,
} from 'reactstrap';
import CardConsultBase from '../../components/Card/ConsultPage/CardConsultBase';
import CardLastsConsults from '../../components/Card/ConsultPage/CardLastsConsults';
import CardLastSends from '../../components/Card/ConsultPage/CardLastSends';
import CardPacient from '../../components/Card/ConsultPage/CardPacient';
import CardSelectedActivities from '../../components/Card/ConsultPage/CardSelectedActivities';
import Main from '../../components/layout/Main';
import useAuth from '../../hooks/useAuth';
import useConsult from '../../hooks/useConsult';
import { fetchMedicalConsultation } from '../../service/API/medical-consultations';

function GameItem({ game, handleChange }) {
  return (
    <Row>
      {game.selected
        ? (
          <Col xs={2}>
            <Button
              onClick={() => { handleChange(game); }}
              size="sm"
            >
              { '<'}
            </Button>
          </Col>
        )
        : <div />}

      <Col xs={1}>
        <i className="fa fa-flag" />
      </Col>
      <Col xs={9} className="text-center">
        {game.nome}
      </Col>
      {!game.selected
        ? (
          <Col xs={2}>
            <Button
              size="sm"
              onClick={() => { handleChange(game); }}
            >
              { '>'}
            </Button>
          </Col>
        )
        : <div />}

    </Row>
  );
}

function index() {
  const { coolClearToken } = useAuth();
  const { query } = useRouter();
  const [loading, setLoading] = useState(true);
  const { consult, setConsult } = useConsult();
  useEffect(async () => {
    if (coolClearToken && query.consultaDetalhe) {
      const response = await fetchMedicalConsultation({
        token: coolClearToken,
        id: query.consultaDetalhe,
      });
      if (response.status === 200) {
        setConsult(response.data);
        // setConsultData(response.data);
        setLoading(false);
      }
    }
  }, [coolClearToken, query]);
  const [games, setGames] = useState([
    {
      id: 1, nome: 'Ligue o som', maxLevel: '1', selected: false,
    },
    {
      id: 2, nome: 'Som animal', maxLevel: '1', selected: false,
    },
    {
      id: 3, nome: 'Para-Escuta-Para', maxLevel: '1', selected: true,
    },
  ]);

  function handleChange(game) {
    const items = [...games];
    const item = {
      ...items[items.indexOf(game)],
    };
    item.selected = !item.selected;
    items[items.indexOf(game)] = item;
    setGames(items);
  }
  if (loading) {
    return (
      <div style={{ marginTop: '50px' }}>
        <Row className="justify-content-center">
          <Spinner size="lg" />
        </Row>
      </div>
    );
  }
  return (
    <div style={{ marginTop: '50px' }}>
      <Card body>
        <Row>
          <Col>
            <CardPacient pacientData={consult.paciente} />
          </Col>
          <Col>
            <CardLastsConsults />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <CardSelectedActivities />
          </Col>
          <Col>
            <CardLastSends />
          </Col>
        </Row>
        <Row className="mt-3 mb-3">
          <Col>
            <CardConsultBase>
              <Row className="text-center">
                <div style={{ fontSize: '1.4em' }}>
                  Observações
                  {' '}
                </div>
              </Row>
              <Row>
                <Input
                  type="textarea"
                />
              </Row>
            </CardConsultBase>
          </Col>

        </Row>
        <Row>
          <Col>
            <CardConsultBase>
              <Col>
                <Row className="text-center mb-3">
                  <div style={{ fontSize: '1.4em' }}>
                    Atividades
                  </div>
                </Row>
                <Row>
                  <Col>
                    <Card body>
                      <Row className="justify-content-center" style={{ fontSize: '1.2em' }}>
                        Atividades Disponíveis
                      </Row>
                      <Row>
                        <ListGroup className="p-3">
                          {games.map((item) => {
                            if (!item.selected) {
                              return (
                                <ListGroupItem>
                                  <GameItem
                                    game={item}
                                    handleChange={() => { handleChange(item); }}
                                  />
                                </ListGroupItem>
                              );
                            }
                            return <div />;
                          })}
                        </ListGroup>
                      </Row>

                    </Card>

                  </Col>
                  <Col>
                    <Card body>
                      <Row className="justify-content-center" style={{ fontSize: '1.2em' }}>
                        Atividades incluídas
                      </Row>
                      <Row>
                        <ListGroup className="p-3">
                          {games.map((item) => {
                            if (item.selected) {
                              return (
                                <ListGroupItem>
                                  <GameItem
                                    game={item}
                                    handleChange={() => { handleChange(item); }}
                                  />
                                </ListGroupItem>
                              );
                            }
                            return <div />;
                          })}
                        </ListGroup>
                      </Row>

                    </Card>
                  </Col>
                </Row>

              </Col>

            </CardConsultBase>
          </Col>

        </Row>
        <Row className="justify-content-center mt-3">
          <Col className="text-center">
            <Button
              color="success"
            >
              Encerrar consulta
            </Button>
          </Col>

        </Row>

      </Card>

    </div>
  );
}
index.layout = Main;
export default index;
