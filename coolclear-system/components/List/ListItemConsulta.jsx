/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import { format, parseISO } from 'date-fns';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import {
  Col, Row, Badge,
} from 'reactstrap';
import { tiposConsulta, tiposStatus } from '../../service/functionsAndTypes';
import CheckConsultaModal from '../Modal/CheckConsultaModal';

const ListItemConsulta = function a({ data }) {
  const [modalState, setModalState] = useState(false);
  const [inputs, setInputs] = useState({ nome: data.nome, email: data.email });
  const { enqueueSnackbar } = useSnackbar();
  return (
    <div>
      <div onClick={() => setModalState(true)} className="p-1">
        <Row>
          <Col xl={1} md={1} xs={2} className="align-self-center text-center">
            <span>
              {data.paciente.sexo === 'F' ? (
                <i className="fas fa-female fa-2x" />
              ) : (
                <i className="fas fa-male fa-2x" />
              )}
            </span>
          </Col>
          <Col xl={7} md={6} xs={10} className="align-self-center">
            <Row>
              <Col style={{ fontSize: '1.2em' }}>{data.paciente.nome}</Col>
            </Row>
            <Row>
              <Col style={{ color: 'grey' }}>
                <i className="fas fa-user-shield" />
                {'  '}
                {data.responsavel.nome}
              </Col>
            </Row>
          </Col>
          <Col xl={2} md={2} xs={6} className="align-self-center">
            <Row className="justify-content-center">
              {format(parseISO(data.data), "dd'/'MM'/'yyyy")}
            </Row>
            <Row className="justify-content-center">
              {format(parseISO(data.data), "HH':'MM")}
            </Row>
          </Col>
          <Col xl={2} md={3} xs={6} className="align-self-center">
            <Row className="justify-content-center mb-2">
              <Badge color="secondary">{tiposConsulta[data.tipo]}</Badge>
            </Row>
            <Row className="justify-content-center">
              <Badge color={tiposStatus[data.status].color}>
                {tiposStatus[data.status].label}
              </Badge>
            </Row>
          </Col>
        </Row>
        <CheckConsultaModal
          modalState={modalState}
          setModalState={setModalState}
          consultData={data}
        />
      </div>
      {/* <ModalWith2Buttons
        confirmAction={{
          action:
          () => { enqueueSnackbar(`Responsavel ${inputs.nome} com email ${inputs.email} editado`,
          { variant: 'success' }); },
          label: 'Editar',
        }}
        declineAction={{ action: () => { setModalState(false); }, label: 'Cancelar' }}
        modalState={modalState}
        setModalState={setModalState}
        title="Editar Responsável"
      >
        <FormGroup row>
          <Label for="nome" sm={2}>
            Nome:
          </Label>
          <Col sm={10}>
            <Input
              id="nome"
              name="nome"
              placeholder="Nome do responsável"
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
        <FormGroup row>
          <Label for="exampleEmail" sm={2}>
            Email:
          </Label>
          <Col sm={10}>
            <Input
              id="exampleEmail"
              name="email"
              placeholder="Email do responsável"
              type="email"
              onChange={(e) => setInputs((currState) => ({
                ...currState,
                email: e.target.value,
              }))}
              value={inputs.email}
              required
            />
          </Col>
        </FormGroup>
      </ModalWith2Buttons> */}
    </div>
  );
};

export default ListItemConsulta;
