import React, { useState } from 'react';
import {
  Col, Input, Row, FormGroup, Label,
} from 'reactstrap';
import { useSnackbar } from 'notistack';
import MainCard from '../../components/Card/MainCard';
import Main from '../../components/layout/Main';
import ComponentRowList from '../../components/List/ComponentRowList';
import ListItemResponsavel from '../../components/List/ListItemResponsavel';
import ModalWith2Buttons from '../../components/Modal/ModalWith2Buttons';
import { mocks } from '../../mocks';

const Responsavel = function b() {
  const [modalState, setModalState] = useState(false);
  const [inputs, setInputs] = useState({ nome: '', email: '' });
  const { enqueueSnackbar } = useSnackbar();

  const confirmAction = () => {
    enqueueSnackbar(`Responsavel ${inputs.nome} com email ${inputs.email} adicionado`, { variant: 'success' });
  };
  const declineAction = () => {
    setModalState(false);
  };

  return (
    <div style={{ marginTop: '50px' }}>
      <Row className="justify-content-center">
        <Col xl={10} lg={11} md={11}>
          <MainCard
            search={{
              types: [{ param: 'name', label: 'Nome' },
                { param: 'email', label: 'Email' }],
            }}
            add={() => setModalState(true)}
            pagination
            title="Responsáveis"
          >
            <ComponentRowList
              list={mocks.responsavelList}
              Component={ListItemResponsavel}
            />
          </MainCard>
        </Col>
      </Row>
      <ModalWith2Buttons
        confirmAction={{ action: confirmAction, label: 'Adicionar' }}
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
