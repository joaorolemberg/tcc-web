/* eslint-disable no-param-reassign */
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_API;
const instance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export async function addResponsableAPI(params) {
  console.log(params);
  let data = {};
  const baseFetchUrl = 'responsables';

  data = await instance
    .post(
      baseFetchUrl,
      {
        first_name: params.inputs.nome,
        last_name: '',
        email: params.inputs.email,
        birthdate: '1995-05-11',
        responsable: {},
      },
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

export async function fetchResponsables(params) {
  let response = {};
  const baseFetchUrl = 'responsables';
  //   if (params.dataInicio) { baseFetchUrl = `${baseFetchUrl}&DataInicio=${params.dataInicio}`; }
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
          nome: `${item.user.first_name} ${item.user.last_name}`,
          email: item.user.email,
          id: item.id,
          patients: item.patients,
        }));
      }
      return resp;
    })
    .catch((error) => error.response);
  return response;
}
