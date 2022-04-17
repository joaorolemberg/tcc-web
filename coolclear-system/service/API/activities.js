/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
import axios from 'axios';

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
