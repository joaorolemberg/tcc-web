import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_API;
const instance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export async function fetchSpeechTherapists(params) {
  let response = {};
  const baseFetchUrl = 'speech-therapists';
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
      resp.data = resp.data.results;
      return resp;
    })
    .catch((error) => error.response);
  return response;
}

export async function fetchSpeechTherapist(params) {
  let response = {};
  const baseFetchUrl = `speech-therapists/${params.speech_therapist_id}`;
  console.log(baseFetchUrl);

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
    .then((resp) => resp)
    .catch((error) => error.response);
  return response;
}
