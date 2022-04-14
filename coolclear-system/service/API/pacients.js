/* eslint-disable no-param-reassign */
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_API;
const instance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export async function addPacientAndResponsableAPI(params) {
  let data = {};
  const baseFetchUrl = 'responsables';

  data = await instance
    .post(
      baseFetchUrl,
      params.obj,
      {
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
      },
    )
    .then((response) => response)
    .catch((error) => error.response);
  if (data.status === 200) {
    const data2 = await instance
      .post(
        'speech-therapists/assign-patient',
        {
          speech_therapist_id: params.speech_therapist_id,
          patient_id: data.data.user.responsable.patients[0].id,
        },
        {
          headers: {
            Authorization: `Bearer ${params.token}`,
          },
        },
      )
      .then((response) => response)
      .catch((error) => error.response);
    if (data2.status === 200) {
      return true;
    }
    return false;
  }
  return false;
}
export async function addPacientAndVinculateResponsableAPI(params) {
  let data = {};
  const baseFetchUrl = 'patients';
  data = await instance
    .post(
      'patients',
      params.obj,
      {
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
      },
    )
    .then((response) => response)
    .catch((error) => error.response);
  if (data.status === 200) {
    console.log('adiconou paciente', data);
    // return true;
    const data2 = await instance
      .post(
        'speech-therapists/assign-patient',
        {
          speech_therapist_id: params.speech_therapist_id,
          patient_id: data.data.id,
        },
        {
          headers: {
            Authorization: `Bearer ${params.token}`,
          },
        },
      )
      .then((response) => response)
      .catch((error) => error.response);
    if (data2.status === 200) {
      console.log('vinculou fono', data2);
      const data3 = await instance
        .post(
          'responsables/assign-patient',
          {
            responsable_id: params.responsable_id,
            patient_id: data.data.id,
          },
          {
            headers: {
              Authorization: `Bearer ${params.token}`,
            },
          },
        )
        .then((response) => response)
        .catch((error) => error.response);
      if (data3.status === 200) {
        console.log('vinculou responsavel', data3);
        return true;
      }
      return false;
    }
    return false;
  }
  return false;
}
export async function fetchPatients(params) {
  let response = {};
  let baseFetchUrl = 'patients';
  if (params.speech_therapist_id) { baseFetchUrl = `${baseFetchUrl}?speech_therapist_id=${params.speech_therapist_id}`; }
  //   if (params.dataFim) { baseFetchUrl = `${baseFetchUrl}&DataFim=${params.dataFim}`; }

  //   if (params.idCondominio) {
  //     baseFetchUrl = `${baseFetchUrl}&IdCondominio=${params.idCondominio}`;
  //   }
  //   if (params.idParceiro) {
  //     baseFetchUrl = `${baseFetchUrl}&IdParceiro=${params.idParceiro}`;
  //   }
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
          responsavel: { nome: 'Teste', id: item.responsable.id },
          nome: `${item.first_name} ${item.last_name}`,
          prontuario: item.medical_record_number,
          dataNascimento: item.birthdate,
          dataImplante: item.implant_date,
          sexo: item.gender,
        }));
      }
      return resp;
    })
    .catch((error) => error.response);
  return response;
}
