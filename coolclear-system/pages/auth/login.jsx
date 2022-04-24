import Router from 'next/router';
import React, { useState } from 'react';
import {
  Col,
  Row,
  Button,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Input,
  Form,
  Spinner,
} from 'reactstrap';
import { useSnackbar } from 'notistack';
import Link from 'next/link';
import useAuth from '../../hooks/useAuth';
import Auth from '../../components/layout/Auth';
import styles from '../../styles/loginPage.module.css';

function index() {
  const { login, isAuthenticating } = useAuth();
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const { enqueueSnackbar } = useSnackbar();
  const onInput = (value, type) => {
    setInputs((currState) => ({ ...currState, [type]: value }));
  };

  const handleLogin = async () => {
    const resp = await login(inputs);
    if (resp.login) {
      Router.replace('/');
    } else {
      enqueueSnackbar(resp.text, { variant: 'error' });
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col xl={4} lg={5} md={5} sm={6} xs={10}>
          <Card>
            <CardHeader className={styles.systemName}>
              CoolClear System
            </CardHeader>
            <CardBody className="text-center">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
              >
                <Input
                  className="mb-3"
                  bsSize="sm"
                  placeholder="Email"
                  type="text"
                  value={inputs.email}
                  onChange={(e) => onInput(e.target.value, 'email')}
                />
                <Input
                  className="mb-3"
                  bsSize="sm"
                  type="password"
                  placeholder="Senha"
                  value={inputs.password}
                  onChange={(e) => onInput(e.target.value, 'password')}
                />
                <Button
                  className="text-center"
                  color="success"
                  size="sm"
                  type="submit"
                  disabled={inputs.email === '' || inputs.password === ''}
                >
                  {isAuthenticating ? (
                    <>
                      <Spinner size="sm" />
                      Autenticando...
                    </>
                  ) : 'Acesssar'}
                </Button>
              </Form>
            </CardBody>
            <CardFooter
              className="text-end"
              style={{ fontWeight: 'lighter', fontSize: '0.7em' }}
            >
              <Link
                href="/auth/forgetPassword"
              >
                Esqueceu a senha?
              </Link>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
index.layout = Auth;
export default index;
