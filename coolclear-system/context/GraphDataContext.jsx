/* eslint-disable radix */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */

import React, { createContext, useState } from 'react';
import { fetchPerformance } from '../service/API/graphData';

const GraphDataContext = createContext({});

export const GraphDataProvider = function b({ children }) {
  const [loadingGraphs, setLoadingGraphs] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [token, setToken] = useState('');

  const [graph1, setGraph1] = useState({

    enabled: false,
  });
  // const [lineGraphDataAllPatients, setLineGraphDataAllPatients] = useState({  });

  const [graph2, setGraph2] = useState({
    enabled: false,
  });
  // const [pizzaGraphDataAllPatients, setPizzaGraphDataAllPatients] = useState(false);

  const [graph3, setGraph3] = useState({
    enabled: false,
  });
  // const [barGraphDataAllPatients, setBarGraphDataAllPatients] = useState(false);

  //   const [GraphDataPatient, GraphDataPatient] = useState(false);
  //   const [GraphDataAllPatients, GraphDataAllPatients] = useState(false);
  function formatDataToGraphNumber(data) {
    const graphData = [];
    let count = 1;
    // eslint-disable-next-line array-callback-return
    data.map((envio) => {
      graphData.push([count, parseFloat(envio.performances[0].value)]);
      count++;
    });
    return graphData;
  }
  function formatDataToGraphBooleanProportion(data) {
    let yes = 0;
    let no = 0;
    // eslint-disable-next-line array-callback-return
    data.map((envio) => {
      // graphData.push([count, parseFloat(envio.performances[0].value)]);
      // count++;
      if (parseInt(envio.performances[0].value) === 0) {
        no++;
      } else {
        yes++;
      }
    });

    return [['Sim', yes], ['Não', no]];
  }
  async function handleJogoMemoria(patient, activity) {
    // tempo restante ao finalizar
    let metricTempoRestanteAoFinalizar = activity.metrics.find((metric) => (metric.name === 'tempo restante ao finalizar'));
    let metricTerminouATempo = activity.metrics.find((metric) => (metric.name === 'terminou a tempo ?'));
    let metricNumeroDeErros = activity.metrics.find((metric) => (metric.name === 'numero de erros'));

    const requestTempoRestanteAoFinalizar = fetchPerformance({
      token,
      patient_id: patient,
      activity_id: activity.id,
      metric_id: metricTempoRestanteAoFinalizar.id,
    });
    const requestTerminouATempo = fetchPerformance({
      token,
      patient_id: patient,
      activity_id: activity.id,
      metric_id: metricTerminouATempo.id,
    });
    const requestNumeroDeErros = fetchPerformance({
      token,
      patient_id: patient,
      activity_id: activity.id,
      metric_id: metricNumeroDeErros.id,
    });
    await Promise.all([
      requestTempoRestanteAoFinalizar,
      requestTerminouATempo,
      requestNumeroDeErros])
      .then((responses) => {
        if (responses[0].status === 200
          && responses[1].status === 200
          && responses[2].status === 200) {
          metricTempoRestanteAoFinalizar = formatDataToGraphNumber(responses[0].data);
          metricTerminouATempo = formatDataToGraphBooleanProportion(responses[1].data);
          metricNumeroDeErros = formatDataToGraphNumber(responses[2].data);
        } else {
          console.log('tudo errado');
        }
      });

    metricTempoRestanteAoFinalizar.unshift(['Envio', 'Tempo restante']);
    setGraph1({
      data: metricTempoRestanteAoFinalizar,
      options: {
        title: 'Tempo de atividade restante por envio',
        legend: { position: 'bottom' },
      },
      chartType: 'LineChart',
      enabled: true,
    });

    metricTerminouATempo.unshift(['Proporção', 'Proporção de conclusão de atividade']);
    setGraph2({
      data: metricTerminouATempo,
      options: {
        title: 'Proporção de conclusão de atividade',
        is3D: true,
        legend: { position: 'bottom' },
      },
      chartType: 'PieChart',
      enabled: true,
    });

    metricNumeroDeErros.unshift(['Proporção', 'Erros']);
    setGraph3({
      data: metricNumeroDeErros,
      options: {
        title: 'Erros por envio',
        legend: { position: 'bottom' },
      },
      chartType: 'ColumnChart',
      enabled: true,
    });
    setLoadingGraphs(false);
  }

  function handleParaEscutaPara(patient, activity) {
    setGraph1({
      data: [
        [
          'Envio',
          'Tempo de reação total',
          'Tempo de reação médio',
        ],
        ['1', 1000, 400],
        ['2', 1500, 502],
        ['3', 3500, 1000],
        ['4', 2000, 693],
        ['5', 1000, 293],
      ],
      options: {
        title: 'Tempo de reação total e médio',
        legend: { position: 'bottom' },
        vAxis: { title: 'Tempo em ms' },
        hAxis: { title: 'Envio' },
        seriesType: 'bars',
        series: { 1: { type: 'line' } },
      },
      chartType: 'ComboChart',
      enabled: true,
    });
    setGraph2({ enabled: false });
    setGraph3({
      data: [
        ['Proporção', 'Erros'],
        ['1', 20],
        ['2', 15],
        ['3', 17],
        ['4', 10],
        ['5', 5],
        ['6', 20],
        ['7', 15],
        ['8', 17],
        ['9', 10],
        ['10', 5],
      ],
      options: {
        title: 'Erros por envio',
        legend: { position: 'bottom' },
      },
      chartType: 'ColumnChart',
      enabled: true,
    });
    setLoadingGraphs(false);
  }
  function handleSomAnimal(patient, activity) {
    setGraph1({
      data: [
        [
          'Envio',
          'Tempo de reação total',
          'Tempo de reação médio',
        ],
        ['1', 1000, 400],
        ['2', 1500, 502],
        ['3', 3500, 1000],
        ['4', 2000, 693],
        ['5', 1000, 293],
      ],
      options: {
        title: 'Tempo de reação total e médio',
        legend: { position: 'bottom' },
        vAxis: { title: 'Tempo em ms' },
        hAxis: { title: 'Envio' },
        seriesType: 'bars',
        series: { 1: { type: 'line' } },
      },
      chartType: 'ComboChart',
      enabled: true,
    });
    setGraph2({
      data: [
        ['Proporção', 'Proporção de conclusão de atividade'],
        ['Sim', 40],
        ['Não', 60],
      ],
      options: {
        title: 'Proporção de conclusão de atividade',
        is3D: true,
        legend: { position: 'bottom' },
      },
      chartType: 'PieChart',
      enabled: true,
    });
    setGraph3({
      data: [
        [
          'Envio',
          'Acerto',
          'Erro',
          'Proporção acerto/erro',
        ],
        ['1', 10, 2, 2.7],
        ['2', 10, 4, 4.2],
        ['3', 10, 10, 5],
        ['4', 10, 7, 7],
        ['5', 10, 0, 10],
      ],
      options: {
        title: 'Acertos e erros por envio',
        legend: { position: 'bottom' },
        vAxis: { title: 'Quantidade' },
        hAxis: { title: 'Envio' },
        seriesType: 'bars',
        series: { 2: { type: 'line' } },
      },
      chartType: 'ComboChart',
      enabled: true,
    });
    setLoadingGraphs(false);
  }
  const handleGraph = (patient, activity, activities) => {
    const selectedActivity = activities.filter((act) => {
      if (act.id === activity) {
        return true;
      }
      return false;
    });
    // if (selectedActivity[0].name ===)
    // console.log("selecionada",selectedActivity);
    setLoadingGraphs(true);
    switch (selectedActivity[0].name) {
      case 'Jogo da memória':
        handleJogoMemoria(patient, selectedActivity[0]);
        break;
      case 'Para-Escuta-Para':
        handleParaEscutaPara(patient, selectedActivity[0]);
        break;
      case 'Som Animal':
        handleSomAnimal(patient, selectedActivity[0]);
        break;
      default:
        break;
    }
    setEnabled(true);
  };

  //   const forceUpdate = () => {
  //     setTriggerUpdate((currState) => !currState);
  //   };
  return (
    <GraphDataContext.Provider
      value={{
        graph1,
        graph2,
        graph3,
        handleGraph,
        setEnabled,
        loadingGraphs,
        enabled,
        setToken,
      }}
    >
      {children}
    </GraphDataContext.Provider>
  );
};
export const GraphDataContextConsumer = GraphDataContext.Consumer;

export default GraphDataContext;
