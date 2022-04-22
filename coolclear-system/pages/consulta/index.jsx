/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Col, Row, Spinner,
} from 'reactstrap';
import { useSnackbar } from 'notistack';
import MainCard from '../../components/Card/MainCard';
import Main from '../../components/layout/Main';
import ComponentRowList from '../../components/List/ComponentRowList';
import AddConsultModal from '../../components/Modal/AddConsultModal';
import ListItemConsulta from '../../components/List/ListItemConsulta';
import useReRender from '../../hooks/useReRender';
import useAuth from '../../hooks/useAuth';
import { fetchMedicalConsultations } from '../../service/API/medical-consultations';

const Consulta = function b() {
  const { coolClearToken } = useAuth();

  const [modalState, setModalState] = useState(false);
  const {
    forceReRender,
    triggerReRender,
    reRender,
    setReRender,
  } = useReRender();
  const [firstRender, setFirstRender] = useState(true);

  const [loading, setLoading] = useState(true);
  const [loadingAdd, setLoadingAdd] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [inputs, setInputs] = useState({ nome: '', email: '' });
  const [consults, setConsults] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(async () => {
    if (coolClearToken) {
      if (firstRender) {
        setLoading(true);

        setFirstRender(false);
        const response = await fetchMedicalConsultations({ token: coolClearToken });
        if (response.status === 200) {
          setConsults(response.data);
        }
        setLoading(false);
      } else if (reRender) {
        setLoading(true);
        setFirstRender(false);
        setReRender(false);
        const response = await fetchMedicalConsultations({ token: coolClearToken });
        if (response.status === 200) {
          setConsults(response.data);
        }
        setLoading(false);
      }
    }
  }, [coolClearToken, triggerReRender]);
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
      <Row className="justify-content-center">
        <Col xl={10} lg={11} md={11}>
          <MainCard
            add={() => setModalState(true)}
            title="Consulta"
          >
            <ComponentRowList
              list={consults}
              Component={ListItemConsulta}
            />
          </MainCard>
        </Col>
      </Row>
      <AddConsultModal
        modalState={modalState}
        setModalState={setModalState}
      />

    </div>
  );
};

Consulta.layout = Main;
export default Consulta;
