import React, { useState, useEffect } from 'react';
import {
  Col, Input, Row, FormGroup, Label,
} from 'reactstrap';
import { useSnackbar } from 'notistack';
import Router from 'next/router';
import MainCard from '../../components/Card/MainCard';
import Main from '../../components/layout/Main';
import ComponentRowList from '../../components/List/ComponentRowList';
import ListItemResponsavel from '../../components/List/ListItemResponsavel';
import ModalWith2Buttons from '../../components/Modal/ModalWith2Buttons';
import { mocks } from '../../mocks';
import useAuth from '../../hooks/useAuth';
import { addResponsableAPI, fetchResponsables } from '../../service/API/responsables';
import useReRender from '../../hooks/useReRender';

const Responsavel = function b() {
  const { coolClearToken } = useAuth();
  const {
    forceReRender,
    triggerReRender,
    reRender,
    setReRender,
  } = useReRender();
  const [firstRender, setFirstRender] = useState(true);

  const [loading, setLoading] = useState(true);
  const [loadingAdd, setLoadingAdd] = useState(false);

  const [modalState, setModalState] = useState(false);
  const [responsables, setResponsables] = useState([]);
  const [inputs, setInputs] = useState({ nome: '', email: '' });
  const { enqueueSnackbar } = useSnackbar();
  useEffect(async () => {
    if (coolClearToken) {
      if (firstRender) {
        setLoading(true);

        setFirstRender(false);
        const response = await fetchResponsables({ token: coolClearToken });
        if (response.status === 200) {
          setResponsables(response.data.results);
          console.log(response.data.results);
        }
        setLoading(false);
      } else if (reRender) {
        setLoading(true);
        setFirstRender(false);
        setReRender(false);
        const response = await fetchResponsables({ token: coolClearToken });
        if (response.status === 200) {
          setResponsables(response.data.results);
        }
        setLoading(false);
      }
    }
  }, [coolClearToken, triggerReRender]);
  const confirmAction = async () => {
    setLoadingAdd(true);
    const response = await addResponsableAPI({ inputs, token: coolClearToken });
    if (response.status === 200) {
      setReRender(true);
      enqueueSnackbar(
        `${inputs.nome} adicionado com sucesso`,
        { variant: 'success' },
      );
    } else {
      enqueueSnackbar(
        'Não foi possível adicionar responsável',
        { variant: 'error' },
      );
    }
    setLoadingAdd(false);
  };
  const declineAction = () => {
    forceReRender();
    setModalState(false);
  };
  if (loading) {
    return <div>Carregando</div>;
  }

  return (
    <div style={{ marginTop: '50px' }}>
      <Row className="justify-content-center">
        <Col xl={10} lg={11} md={11}>
          <MainCard
            search={{
              types: [
                { param: 'name', label: 'Nome' },
                { param: 'email', label: 'Email' },
              ],
            }}
            add={() => setModalState(true)}
            pagination
            title="Responsáveis"
          >
            <ComponentRowList
              list={responsables}
              Component={ListItemResponsavel}
            />
          </MainCard>
        </Col>
      </Row>
      <ModalWith2Buttons
        confirmAction={{ action: confirmAction, label: 'Adicionar', labelLoading: 'Adicionando...' }}
        confirmActionState={loadingAdd}
        declineAction={{ action: declineAction, label: 'Cancelar' }}
        modalState={modalState}
        setModalState={setModalState}
        title="Adicionar Responsável"
      >
        <FormGroup row>
          <Label for="nome" sm={2}>
            Nome:
          </Label>
          <Col sm={10}>
            <Input
              id="nome"
              name="nome"
              placeholder="Nome do responsável"
              type="text"
              required
              onChange={(e) => setInputs((currState) => ({
                ...currState,
                nome: e.target.value,
              }))}
              value={inputs.nome}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail" sm={2}>
            Email:
          </Label>
          <Col sm={10}>
            <Input
              id="exampleEmail"
              name="email"
              placeholder="Email do responsável"
              type="email"
              onChange={(e) => setInputs((currState) => ({
                ...currState,
                email: e.target.value,
              }))}
              value={inputs.email}
              required
            />
          </Col>
        </FormGroup>
      </ModalWith2Buttons>
    </div>
  );
};

Responsavel.layout = Main;
export default Responsavel;
