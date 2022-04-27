import React, { useState, useEffect } from 'react';
import {
  Col, Row, Spinner,
} from 'reactstrap';
import MainCard from '../../components/Card/MainCard';
import Main from '../../components/layout/Main';
import ComponentRowList from '../../components/List/ComponentRowList';
import useAuth from '../../hooks/useAuth';
import { fetchSpeechTherapists } from '../../service/API/speech-therapists';
import ListItemFono from '../../components/List/ListItemFono';
import AddFonoModal from '../../components/Modal/AddFonoModal';

const Fono = function b() {
  const { coolClearToken, user } = useAuth();
  const [modalState, setModalState] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const [pacients, setPacients] = useState([]);

  useEffect(async () => {
    if (coolClearToken) {
      setLoading(true);
      let response = {};
      response = await fetchSpeechTherapists({
        token: coolClearToken,
      });
      if (response.status === 200) {
        setPacients(response.data);
      }
      setLoading(false);
    }
  }, [coolClearToken, user]);

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
            add={() => { setModalState(true); }}
            title="Fonoaudiólogos"
          >
            <ComponentRowList
              list={pacients}
              Component={ListItemFono}
            />
          </MainCard>
        </Col>
      </Row>
      <AddFonoModal modalState={modalState} setModalState={setModalState} />
    </div>
  );
};

Fono.layout = Main;
export default Fono;
