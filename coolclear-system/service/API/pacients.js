/* eslint-disable no-unused-vars */
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
          responsavel: item.responsable ? { nome: `${item.responsable.user.first_name} ${item.responsable.user.last_name}` } : { nome: 'Não cadastrado' },
          nome: `${item.first_name} ${item.last_name}`,
          prontuario: item.medical_record_number,
          dataNascimento: item.birthdate ? item.birthdate.substring(0, item.birthdate.length - 8) : '0001/01/01',
          dataImplante: item.implant_date ? item.implant_date.substring(0, item.implant_date.length - 8) : '0001/01/01',
          sexo: item.gender,
        }));
      }
      return resp;
    })
    .catch((error) => ({ response: error.response, status: error.status }));
  return response;
}

export async function fetchPatient(params) {
  let response = {};
  const baseFetchUrl = `patients/${params.pacient_id}`;
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
        id: resp.data.id,
        responsavel: { nome: `${resp.data.responsable.user.first_name} ${resp.data.responsable.user.last_name}` },
        nome: `${resp.data.first_name} ${resp.data.last_name}`,
        prontuario: resp.data.medical_record_number,
        dataNascimento: resp.data.birthdate.substring(0, resp.data.birthdate.length - 14),
        dataImplante: resp.data.implant_date.substring(0, resp.data.implant_date.length - 14),
        sexo: resp.data.gender,
      };
      return resp;
    })
    .catch((error) => error.response);
  return response;
}

export async function editPatient(params) {
  let response = {};
  const baseFetchUrl = `patients/${params.pacient_id}`;
  response = await instance
    .put(
      baseFetchUrl,
      params.objectApi,
      {
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
      },
    )
    .then((resp) => resp)
    .catch((error) => error.response);
  return response;
}
