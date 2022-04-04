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
  return data;
}
export async function addPacientAndVinculateResponsableAPI(params) {
  let data = {};
  let baseFetchUrl = 'responsables';
  baseFetchUrl = `${baseFetchUrl}/${params.idResponsible}`;
  data = await instance
    .put(
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
  return data;
}
export async function fetchPatients(params) {
  let response = {};
  const baseFetchUrl = 'patients';
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
      if (resp.data.results.lenght !== 0) {
        resp.data.results = resp.data.results.map((item) => ({
          id: item.id,
          responsavel: { nome: 'Teste', id: item.responsable_id },
          nome: `${item.first_name} ${item.last_name}`,
          prontuario: item.medical_record_number,
          dataNascimento: '1999-01-08T00:00',
          dataImplante: '1999-01-08T00:00',
          sexo: 'M',
        }));
      }
      return resp;
    })
    .catch((error) => error.response);
  return response;
}
