import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import useAuth from '../hooks/useAuth';
import Main from '../components/layout/Main';
import CardWithHeader from '../components/Card/CardWithHeader';

function Home() {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (isAuthenticated != null) {
      if (isAuthenticated) {
        setLoading(false);
      } else {
        Router.replace('/auth/login');
      }
    }
  }, [isAuthenticated]);

  if (loading) {
    return <div> carregando</div>;
  }
  return (
    <div>
      <Row className="bg-dark">
        <Col>
          <CardWithHeader title="Próximos atendimentos">
            Teste
          </CardWithHeader>
        </Col>
        <Col>
          <CardWithHeader title="Próximos atendimentos">
            Teste
          </CardWithHeader>
        </Col>
      </Row>

    </div>
  );
}
Home.layout = Main;
export default Home;
