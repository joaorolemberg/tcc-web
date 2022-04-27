/* eslint-disable no-param-reassign */
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_API;
const instance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export async function fetchSpeechTherapists(params) {
  let response = {};
  const baseFetchUrl = 'speech-therapists';
  response = await instance
    .get(
      baseFetchUrl,
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

export async function fetchSpeechTherapist(params) {
  let response = {};
  const baseFetchUrl = `speech-therapists/${params.speech_therapist_id}`;
  response = await instance
    .get(
      baseFetchUrl,
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

export async function addSpeechTherapist(params) {
  const baseFetchUrl = 'speech-therapists';
  const response = await instance
    .post(
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
