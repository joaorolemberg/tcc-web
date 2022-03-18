import React, { useState } from 'react';
import {
  Col, Row,
} from 'reactstrap';
import { useSnackbar } from 'notistack';
import MainCard from '../../components/Card/MainCard';
import Main from '../../components/layout/Main';
import ComponentRowList from '../../components/List/ComponentRowList';
import ListItemResponsavel from '../../components/List/ListItemResponsavel';
import { mocks } from '../../mocks';
import AddConsultModal from '../../components/Modal/AddConsultModal';
import ListItemConsulta from '../../components/List/ListItemConsulta';

const Consulta = function b() {
  const [modalState, setModalState] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [inputs, setInputs] = useState({ nome: '', email: '' });
  const { enqueueSnackbar } = useSnackbar();

  const confirmAction = () => {
    enqueueSnackbar('Consulta marcada com sucesso', { variant: 'success' });
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
              types: [{id: 1, param: 'name', label: 'Nome' },
                { id:2, param: 'email', label: 'Email' }],
            }}
            add={() => setModalState(true)}
            pagination
            filter={[{ id: 1, param: 'newest', label: 'Mais recentes' },
              { id: 2, param: 'Agendada', label: 'Agendada' },
              { id: 3, param: 'Finalizada', label: 'Finalizada' }]}
            title="Consulta"
          >
            <ComponentRowList
              list={mocks.consultaList}
              Component={ListItemConsulta}
            />
          </MainCard>
        </Col>
      </Row>
      <AddConsultModal
        confirmAction={{ action: confirmAction, label: 'Adicionar' }}
        declineAction={{ action: declineAction, label: 'Cancelar' }}
        modalState={modalState}
        setModalState={setModalState}
      />

    </div>
  );
};

Consulta.layout = Main;
export default Consulta;
