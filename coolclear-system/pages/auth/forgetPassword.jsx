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
import useAuth from '../../hooks/useAuth';
import Auth from '../../components/layout/Auth';
import styles from '../../styles/loginPage.module.css';
import { resetPwd, sendResetPwdEmail } from '../../service/API/account';

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
    const resp = await sendResetPwdEmail({
      email: inputs.email,
    });
    if (resp.status === 200) {
      enqueueSnackbar('Email enviado com sucesso! Retornando para página de login...', { variant: 'success' });
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
              Recuperar senha
            </CardHeader>
            <CardBody className="text-center">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleChangePassword();
                }}
              >
                <Label> Insira a seu email</Label>
                <Input
                  className="mb-3"
                  bsSize="sm"
                  type="email"
                  placeholder="Email"
                  value={inputs.email}
                  onChange={(e) => onInput(e.target.value, 'email')}
                />
                <Label>Você receberá um email com um link para fazer a mudança de senha.</Label>

                <Button
                  className="text-center"
                  color="success"
                  size="sm"
                  type="submit"
                  disabled={inputs.email === ''}
                >
                  {reseting ? (
                    <>
                      <Spinner size="sm" />
                      Enviando...
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
