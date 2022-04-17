/* eslint-disable react/prop-types */
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
import { fetchActivities } from '../../service/API/activities';
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
      <Col xs={6} className="text-center">
        {game.nome}
      </Col>
      <Col xs={3}>
        <Row>
          <input type="number" />
        </Row>
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
  const [games, setGames] = useState([]);
  useEffect(async () => {
    if (coolClearToken && query.consultaDetalhe) {
      const response = await fetchMedicalConsultation({
        token: coolClearToken,
        id: query.consultaDetalhe,
      });
      const response2 = await fetchActivities({ token: coolClearToken });
      if (response.status === 200 && response2.status === 200) {
        // console.log(response2.data);
        const gamesApi = response2.data.map((item) => ({
          id: item.id,
          nome: item.name,
          maxLevel: item.number_of_difficulty_levels,
          selectedDifficulty: 1,
          selected: false,
        }));
        setGames(gamesApi);
        setConsult(response.data);
        // setConsultData(response.data);
        setLoading(false);
      }
    }
  }, [coolClearToken, query]);

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
