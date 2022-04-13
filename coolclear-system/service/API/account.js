import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_API;
const instance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export async function loginAPI(params) {
  let data = {};
  const baseFetchUrl = 'users/login';

  data = await instance
    .post(
      baseFetchUrl,
      params,
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
export async function meRoute(params) {
  let data = {};
  const baseFetchUrl = '/me';
  data = await instance
    .get(
      baseFetchUrl,
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

export async function fetchCallCost2(params) {
  let data = {};
  let baseFetchUrl = 'relatorios/custo-chamadas-condominios/?';
  if (params.dataInicio) { baseFetchUrl = `${baseFetchUrl}&DataInicio=${params.dataInicio}`; }
  if (params.dataFim) { baseFetchUrl = `${baseFetchUrl}&DataFim=${params.dataFim}`; }

  if (params.idCondominio) {
    baseFetchUrl = `${baseFetchUrl}&IdCondominio=${params.idCondominio}`;
  }
  if (params.idParceiro) {
    baseFetchUrl = `${baseFetchUrl}&IdParceiro=${params.idParceiro}`;
  }
  data = await instance
    .get(
      baseFetchUrl,
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
