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
    .post(
      baseFetchUrl,
      params.object,
      {
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
      },
    )
    .then((response) => response)
    .catch((error) => error.response);
  return data;
}

export async function fetchMedicalConsultations(params) {
  let response = {};
  const baseFetchUrl = 'medical-consultations';
  response = await instance
    .get(
      baseFetchUrl,
      {
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
      },
    )
    .then((resp) => {
      if (resp.data.lenght !== 0) {
        resp.data = resp.data.map((item) => ({
          id: item.id,
          paciente: {
            nome: `${item.speech_therapist_patient.patients.first_name} ${item.speech_therapist_patient.patients.last_name}`,
            sexo: item.speech_therapist_patient.patients.gender,
            idPacient: item.speech_therapist_patient.patients.id,
          },
          speech_therapist_patient_id: item.speech_therapist_patient_id,
          responsavel: { nome: 'Pedro' },
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
    .get(
      baseFetchUrl,
      {
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
      },
    )
    .then((resp) => {
      resp.data = {
        ...resp.data,
        id: resp.data.id,
        paciente: {
          nome: `${resp.data.speech_therapist_patient.patients.first_name} ${resp.data.speech_therapist_patient.patients.last_name}`,
          sexo: resp.data.speech_therapist_patient.patients.gender,
          idPacient: resp.data.speech_therapist_patient.patients.id,
          prontuario: resp.data.speech_therapist_patient.patients.medical_record_number,
          // eslint-disable-next-line max-len
          dataImplante: resp.data.speech_therapist_patient.patients.implant_date.substring(0, resp.data.speech_therapist_patient.patients.implant_date.length - 8),
          // eslint-disable-next-line max-len
          dataNascimento: resp.data.speech_therapist_patient.patients.birthdate.substring(0, resp.data.speech_therapist_patient.patients.birthdate.length - 8),
          responsavel: { nome: 'Pedro' },
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
  console.log(response);
  return response;
}
