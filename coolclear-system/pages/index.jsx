/* eslint-disable no-unused-vars */
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import useAuth from '../hooks/useAuth';
import Main from '../components/layout/Main';
import CardWithHeader from '../components/Card/CardWithHeader';
import { fetchMedicalConsultations } from '../service/API/medical-consultations';

function Home() {
  const { coolClearToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [consults, setConsults] = useState([]);

  useEffect(async () => {
    setLoading(true);
    if (coolClearToken != null) {
      if (coolClearToken === 'NOTLOGGED') {
        Router.replace('/auth/login');
      } else {
        const response = await fetchMedicalConsultations({ token: coolClearToken });
        if (response.status === 200) {
          let today = new Date();
          today = today.toISOString().substring(0, today.toISOString().length - 14);
          const todayConsults = response.data.filter((consult) => {
            if (consult.data.substring(0, consult.data.length - 6) === today) {
              return true;
            }
            return false;
          });
          setConsults(todayConsults);
        }
        setLoading(false);
      }
    }
  }, [coolClearToken]);

  if (loading) {
    return <div> carregando</div>;
  }
  return (
    <div>
      <Row className="bg-dark">
        <Col>
          <CardWithHeader title="Últimos envios">
            Teste
          </CardWithHeader>
        </Col>
        <Col>
          <CardWithHeader title="Consultas de hoje">
            teste
          </CardWithHeader>
        </Col>
      </Row>

    </div>
  );
}
Home.layout = Main;
export default Home;
