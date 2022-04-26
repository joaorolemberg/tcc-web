/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import { Router, useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
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
import { assignActivities, fetchActivities } from '../../service/API/activities';
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
          <input type="number" max={game.maxLevel} onChange={(e) => { const teste = e.target.value; handleChange(game, teste); }} value={game.selectedDifficulty} min={1} disabled={game.selected} />
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
  const { push, query } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const { consult, setConsult } = useConsult();
  const [games, setGames] = useState([]);
  const [observations, setOservations] = useState('');

  useEffect(async () => {
    if (coolClearToken && query.consultaDetalhe) {
      const response = await fetchMedicalConsultation({
        token: coolClearToken,
        id: query.consultaDetalhe,
      });
      console.log(response);

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

  function handleChange(game, dificulty) {
    if (dificulty) {
      const items = [...games];
      const item = {
        ...items[items.indexOf(game)],
      };
      item.selectedDifficulty = dificulty;
      items[items.indexOf(game)] = item;
      setGames(items);
    } else {
      const items = [...games];
      const item = {
        ...items[items.indexOf(game)],
      };
      item.selected = !item.selected;
      items[items.indexOf(game)] = item;
      setGames(items);
    }
  }

  async function encerrarConsulta() {
    const gamesApi = games.filter((item) => {
      if (item.selected) {
        return true;
      }
      return false;
    });
    const objectApi = {
      observation: observations,
      status: 'Concluida',
    };
    setLoadingAdd(true);
    const response = await assignActivities({
      token: coolClearToken,
      objectApi,
      id: consult.id,
      games: gamesApi,
    });
    if (response) {
      enqueueSnackbar('Consulta encerrada com sucesso, voltando para consultas', { variant: 'success' });
      setTimeout(() => {
        push('/consulta');
      }, 2000);
    } else {
      enqueueSnackbar('Não foi possível encerrar a consulta, tente novamente', { variant: 'error' });
    }
    setLoadingAdd(false);
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
        {/* <Row className="mt-3">
          <Col>
            <CardSelectedActivities />
          </Col>
          <Col>
            <CardLastSends />
          </Col>
        </Row> */}
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
                  value={observations}
                  onChange={(e) => (setOservations(e.target.value))}
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
                                <ListGroupItem key={item.id}>
                                  <GameItem
                                    game={item}
                                    handleChange={handleChange}
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
                                <ListGroupItem key={item.id}>
                                  <GameItem
                                    game={item}
                                    handleChange={handleChange}
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
              onClick={() => (encerrarConsulta())}
            >
              {loadingAdd ? 'Encerrando...' : 'Encerrar consulta'}
            </Button>
          </Col>

        </Row>

      </Card>

    </div>
  );
}
index.layout = Main;
export default index;
