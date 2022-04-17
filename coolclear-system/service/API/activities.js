/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import { editMedicalConsultation } from './medical-consultations';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_API;
const instance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// export async function addConsult(params) {
//   let data = {};
//   const baseFetchUrl = 'activities';

//   data = await instance
//     .post(baseFetchUrl, params.object, {
//       headers: {
//         Authorization: `Bearer ${params.token}`,
//       },
//     })
//     .then((response) => response)
//     .catch((error) => error.response);
//   return data;
// }

export async function fetchActivities(params) {
  let response = {};
  const baseFetchUrl = 'activities';
  // if (params.patient_id) { baseFetchUrl = `${baseFetchUrl}?patient_id=${params.patient_id}`; }
  response = await instance
    .get(baseFetchUrl, {
      headers: {
        Authorization: `Bearer ${params.token}`,
      },
    })
    .then((resp) => resp)
    .catch((error) => error.response);
  return response;
}
export async function fetchAssignments(params) {
  let response = {};
  let baseFetchUrl = 'assignments';
  if (params.patient_id) { baseFetchUrl = `${baseFetchUrl}?patient_id=${params.patient_id}`; }
  response = await instance
    .get(baseFetchUrl, {
      headers: {
        Authorization: `Bearer ${params.token}`,
      },
    })
    .then((resp) => resp)
    .catch((error) => error.response);
  return response;
}
export async function assignActivities(params) {
  let response = {};
  const baseFetchUrl = 'assignments';
  // if (params.patient_id) { baseFetchUrl = `${baseFetchUrl}?patient_id=${params.patient_id}`; }
  let control = true;

  for (let index = 0; index < params.games.length; index++) {
    response = await instance
      .post(
        baseFetchUrl,
        {
          medical_consultation_id: params.id,
          difficulty_level: params.games[index].selectedDifficulty,
          activity_id: params.games[index].id,
        },
        {
          headers: {
            Authorization: `Bearer ${params.token}`,
          },
        },
      )
      .then((resp) => resp)
      .catch((error) => error.response);
    if (response.status !== 200) {
      control = false;
    }
  }
  if (control) {
    const responseEdit = await editMedicalConsultation(params);
    if (responseEdit.status === 200) {
      control = true;
    }
  }

  return control;
}
