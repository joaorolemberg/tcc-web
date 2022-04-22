/* eslint-disable no-unused-vars */
import Router, { useRouter } from 'next/router';
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
  Label,
} from 'reactstrap';
import { useSnackbar } from 'notistack';
import useAuth from '../../../hooks/useAuth';
import Auth from '../../../components/layout/Auth';
import styles from '../../../styles/loginPage.module.css';
import { resetPwd } from '../../../service/API/account';

function index() {
  const { push, query } = useRouter();
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const [reseting, setReseting] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const onInput = (value, type) => {
    setInputs((currState) => ({ ...currState, [type]: value }));
  };

  const handleChangePassword = async () => {
    setReseting(true);
    const resp = await resetPwd({
      token: query.resetCode,
      password: inputs.password,
    });
    if (resp.status === 200) {
      enqueueSnackbar('Senha alterada com sucesso! Retornando para página de login...', { variant: 'success' });
      setTimeout(() => {
        push('/auth/login');
      }, 2000);
    } else {
      enqueueSnackbar('Ocorreu um erro, por favor tente novamente!', { variant: 'error' });
    }
    setReseting(false);
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col xl={4} lg={5} md={5} sm={6} xs={10}>
          <Card>
            <CardHeader className={styles.systemName} style={{ fontSize: '20px' }}>
              Mudança de senha
            </CardHeader>
            <CardBody className="text-center">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleChangePassword();
                }}
              >
                <Label> Insira a nova senha</Label>
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
                  disabled={inputs.password === ''}
                >
                  {reseting ? (
                    <>
                      <Spinner size="sm" />
                      Resetando...
                    </>
                  ) : 'Confirmar'}
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
index.layout = Auth;
export default index;
