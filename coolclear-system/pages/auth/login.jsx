import Router from 'next/router';
import React from 'react';
import {
  Col, Row, Button, Card, CardHeader, CardFooter, CardBody, Input,
} from 'reactstrap';
import useAuth from '../../hooks/useAuth';
import Auth from '../../components/layout/Auth';

function index() {
  const { setIsAuthenticated } = useAuth();
  return (
    <div>
      <Row className="justify-content-center">
        <Col xl={4} lg={5} md={5} sm={6} xs={10}>
          <Card>
            <CardHeader className="text-center">
              CoolClear System
            </CardHeader>
            <CardBody className="text-center">
              <Input className="mb-3" bsSize="sm" placeholder="Email" />
              <Input className="mb-3" bsSize="sm" placeholder="Senha" />
              <Button
                className="text-center"
                color="success"
                size="sm"
                onClick={() => {
                  setIsAuthenticated(true);
                  Router.push('/');
                }}
                type="button"
              >
                {' '}
                Acessar
                {' '}

              </Button>
            </CardBody>
            <CardFooter className="text-end" style={{fontWeight: 'lighter', fontSize: '0.7em'}}>
              Esqueceu a senha?
            </CardFooter>
          </Card>
        </Col>
      </Row>

    </div>

  );
}
index.layout = Auth;
export default index;
