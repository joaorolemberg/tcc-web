/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_API;
const instance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export async function fetchPerformance(params) {
  let response = {};
  let baseFetchUrl = 'patients-activities-register?';
  if (params.patient_id) { baseFetchUrl = `${baseFetchUrl}patient_id=${params.patient_id}`; }
  if (params.activity_id) { baseFetchUrl = `${baseFetchUrl}&activity_id=${params.activity_id}`; }
  if (params.metric_id) { baseFetchUrl = `${baseFetchUrl}&metric_id=${params.metric_id}`; }
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
export async function fetchPerformanceAllPatients(params) {
  let response = {};
  let baseFetchUrl = 'patients-activities-register?'; // acionar all na rota
  if (params.activity_id) { baseFetchUrl = `${baseFetchUrl}?activity_id=${params.activity_id}`; }
  if (params.metric_id) { baseFetchUrl = `${baseFetchUrl}?metric_id=${params.metric_id}`; }
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
