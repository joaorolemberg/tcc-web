import React, { useState, useEffect } from 'react';
import {
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
import Router from 'next/router';
import MainCard from '../../components/Card/MainCard';
import Main from '../../components/layout/Main';
import CardConsultBase from '../../components/Card/ConsultPage/CardConsultBase';
import useAuth from '../../hooks/useAuth';
import { fetchResponsables } from '../../service/API/responsables';
import DatalistInput from '../../components/List/DatalistInput';
import { addPacientAndResponsableAPI, addPacientAndVinculateResponsableAPI } from '../../service/API/pacients';

const AdicionarPaciente = function b() {
  // eslint-disable-next-line no-unused-vars
  const [modalState, setModalState] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [loadingAdd, setLoadingAdd] = useState(false);

  const [responsables, setResponsables] = useState([]);
  const [selectedResponsable, setSelectedResponsable] = useState({});

  const { coolClearToken, user } = useAuth();
  useEffect(async () => {
    if (coolClearToken) {
      const response = await fetchResponsables({ token: coolClearToken });
      if (response.status === 200) {
        const responsablesItems = response.data.map((item) => ({
          key: item.id,
          label: item.nome,
          data: item.patients,
        }));
        setResponsables(responsablesItems);
      }
    }
  }, [coolClearToken]);

  // eslint-disable-next-line no-unused-vars
  const initialState = {
    nome: '',
    prontuario: '',
    nascimento: '',
    dataImplante: '',
    dataNascimento: '',
    sexo: 'M',
  };
  const [inputs, setInputs] = useState(initialState);
  const [responsavel, setResponsavel] = useState({ id: null, nome: '', email: '' });
  const { enqueueSnackbar } = useSnackbar();

  const resetForm = () => {
    setInputs(initialState);
    setResponsavel({ id: null, nome: '', email: '' });
  };

  const addPacient = async () => {
    let objectApi = {};
    setLoadingAdd(true);
    if (activeTab === 1) { // responsavel existente
      objectApi = {
        first_name: inputs.nome,
        last_name: '',
        medical_record_number: inputs.prontuario,
        implant_date: inputs.dataImplante,
        birthdate: inputs.dataNascimento,
        gender: inputs.sexo,
      };
      const response = await addPacientAndVinculateResponsableAPI({
        token: coolClearToken,
        obj: objectApi,
        responsable_id: selectedResponsable.key,
        speech_therapist_id: user.speech_therapist.id,
      });
      if (response) {
        enqueueSnackbar('Paciente adicionado com sucesso!', { variant: 'success' });
        resetForm();
      } else {
        enqueueSnackbar('Algo deu errado, tente novamente!', { variant: 'error' });
      }
    } else {
      objectApi = {
        first_name: responsavel.nome,
        last_name: '',
        email: responsavel.email,
        birthdate: '1995-05-11',
        responsable: {
          patients: [
            {
              first_name: inputs.nome,
              last_name: '',
              medical_record_number: inputs.prontuario,
              implant_date: inputs.dataImplante,
              birthdate: inputs.dataNascimento,
              gender: inputs.sexo,
            },
          ],
        },
      };
      const response = await addPacientAndResponsableAPI({
        token: coolClearToken,
        obj: objectApi,
        speech_therapist_id: user.speech_therapist.id,
      });
      if (response) {
        enqueueSnackbar('Paciente e Responsável adicionados com sucesso!', { variant: 'success' });
        resetForm();
      } else {
        enqueueSnackbar('Algo deu errado, tente novamente!', { variant: 'error' });
      }
    }
    setLoadingAdd(false);
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
                        <option value="M">
                          Masculino
                        </option>
                        <option value="F">
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
                              {/* <Label for="vincularResponsavel" sm={2}>
                                Responsável:
                              </Label> */}
                              <Col sm={10}>
                                <DatalistInput
                                  id="vincularResponsavel"
                                  placeholder="Buscar responsável"
                                  items={responsables}
                                  setSelectedState={setSelectedResponsable}
                                  label="Responsável"
                                  idNotInt
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
              <Row className="mt-3 justify-content-around">
                <Col sm={3} className="text-center">
                  <Button
                    color="success"
                    type="submit"
                    disabled={activeTab === 1
                      ? (!selectedResponsable.key)
                      : (!(responsavel.email !== '' && responsavel.nome !== ''))}
                  >
                    {loadingAdd ? 'Adicionando...' : 'Adicionar'}
                  </Button>
                </Col>
                <Col sm={3} className="text-center">
                  <Button
                    className="ml-3"
                    type="button"
                    onClick={() => { Router.back(); }}
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
