/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_API;
const instance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export async function fetchPerformanceByActivity(params) {
  const data = [

  ];
}
