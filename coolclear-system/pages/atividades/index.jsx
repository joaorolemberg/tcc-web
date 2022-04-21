/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Col, Input, Row, FormGroup, Label, Spinner,
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
import { fetchActivities } from '../../service/API/activities';
import ListItemActivity from '../../components/List/ListItemActivity';

const Atividades = function b() {
  const { coolClearToken } = useAuth();

  const [loading, setLoading] = useState(true);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [activities, setActivities] = useState([]);
  useEffect(async () => {
    if (coolClearToken) {
      setLoading(true);
      const response = await fetchActivities({ token: coolClearToken });
      if (response.status === 200) {
        setActivities(response.data);
      }
      setLoading(false);
    }
  }, [coolClearToken]);
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
            title="Atividades"
          >
            <ComponentRowList
              list={activities}
              Component={ListItemActivity}
            />
          </MainCard>
        </Col>
      </Row>
    </div>
  );
};

Atividades.layout = Main;
export default Atividades;
