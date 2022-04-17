/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'reactstrap';
import { format, parseISO } from 'date-fns';
import { useRouter } from 'next/router';
import useAuth from '../../../hooks/useAuth';
import useConsult from '../../../hooks/useConsult';
import { fetchMedicalConsultations } from '../../../service/API/medical-consultations';
import BaseModal from '../../Modal/BaseModal';

function CardLastsConsults({ allConsults }) {
  const { query } = useRouter();
  const { coolClearToken } = useAuth();
  const { consult } = useConsult();
  const [lastsConsults, setLastsConsults] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [observations, setObservations] = useState({ text: '', date: '' });
  useEffect(async () => {
    if (coolClearToken) {
      if (allConsults) {
        const response = await fetchMedicalConsultations({
          token: coolClearToken,
          patient_id: query.pacienteDetalhe,
        });
        if (response.status === 200) {
          setLastsConsults(response.data);
        }
      } else if (consult) {
        const response = await fetchMedicalConsultations({
          token: coolClearToken,
          patient_id: consult.paciente.idPacient,
        });
        if (response.status === 200) {
          const lasts = response.data.filter((item) => {
            if (item.id !== consult.id) {
              return true;
            }
            return false;
          });
          setLastsConsults(lasts);
        }
      }
    }
  }, [coolClearToken, consult]);
  return (
    <Card body style={{ backgroundColor: '#CBDFCC', height: '100%' }}>
      <Row style={{ height: '100%' }}>

        <Row className="text-center">
          <div style={{ fontSize: '1.4em' }}>
            Consultas anteriores
            {' '}
          </div>
        </Row>
        {lastsConsults.length !== 0
          ? lastsConsults.map((item) => (
            <Row className="text-center">
              <Col>
                {format(parseISO(item.data), "dd'/'MM'/'yyyy ")}
              </Col>
              <Col>
                <a href="#" onClick={() => { setObservations({ date: format(parseISO(item.data), "dd'/'MM'/'yyyy "), text: item.observation }); setModalState(true); }} on>Observacoes</a>
              </Col>
            </Row>
          ))
          : <div> Não há consultas anteriores</div>}
      </Row>
      <BaseModal
        modalState={modalState}
        setModalState={setModalState}
        title={`Observacoes ${observations.date}`}
        size="mb"
        // eslint-disable-next-line react/no-unstable-nested-components
        Body={() => (
          <div>
            {observations.text || 'Sem observacoes na consulta'}
          </div>
        )}
      />

    </Card>

  );
}

export default CardLastsConsults;
