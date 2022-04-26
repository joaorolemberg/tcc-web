/* eslint-disable no-param-reassign */
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_API;
const instance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export async function addConsult(params) {
  let data = {};
  const baseFetchUrl = 'medical-consultations';

  data = await instance
    .post(baseFetchUrl, params.object, {
      headers: {
        Authorization: `Bearer ${params.token}`,
      },
    })
    .then((response) => response)
    .catch((error) => error.response);
  return data;
}

export async function fetchMedicalConsultations(params) {
  let response = {};
  let baseFetchUrl = 'medical-consultations';
  if (params.patient_id) { baseFetchUrl = `${baseFetchUrl}?patient_id=${params.patient_id}`; }

  response = await instance
    .get(baseFetchUrl, {
      headers: {
        Authorization: `Bearer ${params.token}`,
      },
    })
    .then((resp) => {
      if (resp.data.lenght !== 0) {
        resp.data = resp.data.map((item) => ({
          id: item.id,
          paciente: {
            nome: `${item.speech_therapist_patient.patient.first_name} ${item.speech_therapist_patient.patient.last_name}`,
            sexo: item.speech_therapist_patient.patient.gender,
            idPacient: item.speech_therapist_patient.patient.id,
          },
          observation: item.observation,
          speech_therapist_patient_id: item.speech_therapist_patient_id,
          responsavel: { nome: `${item.speech_therapist_patient.patient.responsable.user.first_name} ${item.speech_therapist_patient.patient.responsable.user.last_name}` },
          tipo: item.type,
          status: item.status,
          data: item.date.substring(0, item.date.length - 8),
        }));
      }
      return resp;
    })
    .catch((error) => error.response);
  return response;
}

export async function fetchMedicalConsultation(params) {
  let response = {};
  const baseFetchUrl = `medical-consultations/${params.id}`;
  response = await instance
    .get(baseFetchUrl, {
      headers: {
        Authorization: `Bearer ${params.token}`,
      },
    })
    .then((resp) => {
      resp.data = {
        ...resp.data,
        id: resp.data.id,
        paciente: {
          nome: `${resp.data.speech_therapist_patient.patient.first_name} ${resp.data.speech_therapist_patient.patient.last_name}`,
          sexo: resp.data.speech_therapist_patient.patient.gender,
          idPacient: resp.data.speech_therapist_patient.patient.id,
          prontuario:
            resp.data.speech_therapist_patient.patient.medical_record_number,
          // eslint-disable-next-line max-len
          dataImplante:
            resp.data.speech_therapist_patient.patient.implant_date.substring(
              0,
              resp.data.speech_therapist_patient.patient.implant_date.length
                - 8,
            ),
          // eslint-disable-next-line max-len
          dataNascimento: resp.data.speech_therapist_patient.patient.birthdate ? resp.data.speech_therapist_patient.patient.birthdate.substring(0, resp.data.speech_therapist_patient.patient.birthdate.length - 8) : '2020-01-01',
          responsavel: { nome: `${resp.data.speech_therapist_patient.patient.responsable.user.first_name} ${resp.data.speech_therapist_patient.patient.responsable.user.last_name}` },
        },
        speech_therapist_patient_id: resp.data.speech_therapist_patient_id,
        responsavel: { nome: 'Pedro' },
        tipo: resp.data.type,
        status: resp.data.status,
        data: resp.data.date.substring(0, resp.data.date.length - 8),
      };

      return resp;
    })
    .catch((error) => error.response);
  return response;
}
export async function editMedicalConsultation(params) {
  let response = {};
  const baseFetchUrl = `medical-consultations/${params.id}`;
  response = await instance
    .put(baseFetchUrl, params.objectApi, {
      headers: {
        Authorization: `Bearer ${params.token}`,
      },
    })
    .then((resp) => resp)
    .catch((error) => error.response);
  return response;
}
