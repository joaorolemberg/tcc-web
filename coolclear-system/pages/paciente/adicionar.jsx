import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col, Row,
  FormGroup,
  Label,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Button,
  Form,

} from 'reactstrap';
import { useSnackbar } from 'notistack';
import MainCard from '../../components/Card/MainCard';
import Main from '../../components/layout/Main';
import ComponentRowList from '../../components/List/ComponentRowList';
import { mocks } from '../../mocks';
import ListItemPaciente from '../../components/List/ListItemPaciente';
import CardConsultBase from '../../components/Card/ConsultPage/CardConsultBase';
import Router from 'next/router';

const AdicionarPaciente = function b() {
  const [modalState, setModalState] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

  // eslint-disable-next-line no-unused-vars
  const initialState = {
    nome: '',
    prontuario: '',
    nascimento: '',
    dataImplante: '',
    dataNascimento: '',
    sexo: '',
  };
  const [inputs, setInputs] = useState(initialState);
  const [responsavel, setResponsavel] = useState({ id: null, nome: '', email: '' });
  const { enqueueSnackbar } = useSnackbar();

  const confirmAction = () => {
    enqueueSnackbar('Consulta marcada com sucesso', { variant: 'success' });
  };
  const declineAction = () => {
    setModalState(false);
  };

  const resetForm = () => {
    setInputs(initialState);
  };

  const addPacient = () => {
    console.log('inputsPaciente', inputs);
    console.log('responsavel', responsavel);
  };

  return (
    <div style={{ marginTop: '50px' }}>
      <Row className="justify-content-center">
        <Col>
          <MainCard
            title="Adicionar Paciente"
          >
            <Form onSubmit={(e) => { e.preventDefault(); addPacient(); }}>
              <Row>
                <Col xl={8} lg={8} md={12} sm={12} xs={12}>
                  <FormGroup>
                    <Label for="nome">
                      Nome:
                    </Label>
                    <Col>
                      <Input
                        id="nome"
                        name="nome"
                        placeholder="Nome do paciente"
                        type="text"
                        required
                        onChange={(e) => setInputs((currState) => ({
                          ...currState,
                          nome: e.target.value,
                        }))}
                        value={inputs.nome}
                      />
                    </Col>
                  </FormGroup>
                </Col>
                <Col xl={4} lg={4} md={6} sm={6} xs={12}>
                  <FormGroup>
                    <Label for="prontuario">
                      Prontuário:
                    </Label>
                    <Col>
                      <Input
                        id="prontuario"
                        name="prontuario"
                        placeholder="Número do prontuário"
                        type="number"
                        onChange={(e) => setInputs((currState) => ({
                          ...currState,
                          prontuario: e.target.value,
                        }))}
                        value={inputs.prontuario}
                        required
                      />
                    </Col>
                  </FormGroup>
                </Col>
                <Col xl={4} lg={4} md={6} sm={6} xs={12}>
                  <FormGroup>
                    <Label for="nascimento">
                      Data de nascimento:
                    </Label>
                    <Col>
                      <Input
                        id="nascimento"
                        name="nascimento"
                        type="date"
                        onChange={(e) => setInputs((currState) => ({
                          ...currState,
                          dataNascimento: e.target.value,
                        }))}
                        value={inputs.dataNascimento}
                        required
                      />
                    </Col>
                  </FormGroup>
                </Col>
                <Col xl={4} lg={4} md={6} sm={6} xs={12}>
                  <FormGroup>
                    <Label for="dataImplante">
                      Data implante:
                    </Label>
                    <Col>
                      <Input
                        id="dataImplante"
                        name="dataImplante"
                        type="date"
                        onChange={(e) => setInputs((currState) => ({
                          ...currState,
                          dataImplante: e.target.value,
                        }))}
                        value={inputs.dataImplante}
                        required
                      />
                    </Col>
                  </FormGroup>
                </Col>
                <Col xl={4} lg={4} md={6} sm={6} xs={12}>
                  <FormGroup>
                    <Label for="sexo">
                      Sexo:
                    </Label>
                    <Col>
                      <Input
                        id="sexo"
                        name="sexo"
                        type="select"
                        onChange={(e) => setInputs((currState) => ({
                          ...currState,
                          sexo: e.target.value,
                        }))}
                        value={inputs.sexo}
                        required
                      >
                        <option>
                          Masculino
                        </option>
                        <option>
                          Feminino
                        </option>
                      </Input>
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
              {/* RESPONSAVEL AREA */ }
              <Row>
                <Col>
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        style={activeTab === 1 ? { backgroundColor: 'green', color: 'white' } : { color: 'green' }}
                        onClick={() => { setActiveTab(1); }}
                      >
                        Vincular Responsável
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={activeTab === 2 ? { backgroundColor: 'green', color: 'white' } : { color: 'green' }}
                        onClick={() => { setActiveTab(2); }}
                      >
                        Adicionar Responsável
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId={1}>
                      <CardConsultBase>
                        <Row className="justify-content-center mt-3">
                          <Col xl={8}>
                            <FormGroup row>
                              <Label for="vincularResponsavel" sm={2}>
                                Responsável:
                              </Label>
                              <Col sm={10}>
                                <Input
                                  id="vincularResponsavel"
                                  name="vincularResponsavel"
                                  type="text"
                                  placeholder="Buscar responsável"
                                  onChange={(e) => setResponsavel((currState) => ({
                                    ...currState, nome: e.target.value,
                                  }))}
                                  value={responsavel.nome}
                                />
                              </Col>
                            </FormGroup>
                          </Col>
                        </Row>
                      </CardConsultBase>
                    </TabPane>
                    <TabPane tabId={2}>
                      <CardConsultBase>
                        <Row className="justify-content-center mt-3">
                          <Col xl={8}>
                            <FormGroup row>
                              <Label for="adicionarResponsavel" sm={2}>
                                Nome:
                              </Label>
                              <Col sm={10}>
                                <Input
                                  id="adicionarResponsavel"
                                  name="adicionarResponsavel"
                                  type="text"
                                  placeholder="Insira o nome do responsável"
                                  onChange={(e) => setResponsavel((currState) => (
                                    { ...currState, nome: e.target.value }
                                  ))}
                                  value={responsavel.nome}
                                />
                              </Col>
                            </FormGroup>
                          </Col>
                          <Col xl={8}>
                            <FormGroup row>
                              <Label for="emailResponsavel" sm={2}>
                                Email:
                              </Label>
                              <Col sm={10}>
                                <Input
                                  id="emailResponsavel"
                                  name="emailResponsavel"
                                  type="email"
                                  placeholder="Insira o email do responsável"
                                  onChange={(e) => setResponsavel((currState) => (
                                    { ...currState, email: e.target.value }
                                  ))}
                                  value={responsavel.email}
                                />
                              </Col>
                            </FormGroup>
                          </Col>
                        </Row>
                      </CardConsultBase>
                    </TabPane>
                  </TabContent>
                </Col>
              </Row>
              <Row className="mt-3 justify-content-around" >
                <Col sm={3} className="text-center">
                  <Button
                    color="success"
                    type="submit"
                  >
                    Adicionar
                  </Button>
                </Col>
                <Col sm={3} className="text-center">
                  <Button
                    className="ml-3"
                    type="button"
                    onClick={()=>{ Router.back() }}
                  >
                    Cancelar
                  </Button>

                </Col>
              </Row>
            </Form>
          </MainCard>
        </Col>

      </Row>
    </div>
  );
};

AdicionarPaciente.layout = Main;
export default AdicionarPaciente;
