import React, { useState, useEffect } from 'react';
import {
  Col, Row,
} from 'reactstrap';
import { useSnackbar } from 'notistack';
import Router from 'next/router';
import MainCard from '../../components/Card/MainCard';
import Main from '../../components/layout/Main';
import ComponentRowList from '../../components/List/ComponentRowList';
import AddConsultModal from '../../components/Modal/AddConsultModal';
import ListItemPaciente from '../../components/List/ListItemPaciente';
import { fetchPatients } from '../../service/API/pacients';
import useAuth from '../../hooks/useAuth';

const Paciente = function b() {
  const { coolClearToken } = useAuth();

  const [modalState, setModalState] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const [pacients, setPacients] = useState([]);

  const [inputs, setInputs] = useState({ nome: '', email: '' });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(async () => {
    if (coolClearToken) {
      setLoading(true);
      const response = await fetchPatients({ token: coolClearToken });
      if (response.status === 200) {
        setPacients(response.data.results);
      }
      setLoading(false);
    }
  }, [coolClearToken]);

  const confirmAction = () => {
    enqueueSnackbar('Consulta marcada com sucesso', { variant: 'success' });
  };
  const declineAction = () => {
    setModalState(false);
  };
  if (loading) {
    return <div> carregando</div>;
  }
  return (
    <div style={{ marginTop: '50px' }}>
      <Row className="justify-content-center">
        <Col xl={10} lg={11} md={11}>
          <MainCard
            search={{
              types: [{ id: 1, param: 'name', label: 'Nome' },
                { id: 2, param: 'email', label: 'Email' }],
            }}
            add={() => Router.push('/paciente/adicionar')}
            pagination
            title="Pacientes"
          >
            <ComponentRowList
              list={pacients}
              Component={ListItemPaciente}
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

Paciente.layout = Main;
export default Paciente;
