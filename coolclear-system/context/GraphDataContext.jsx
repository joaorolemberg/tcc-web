/* eslint-disable no-case-declarations */
/* eslint-disable max-len */
/* eslint-disable radix */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */

import React, { createContext, useState } from 'react';
import { fetchPerformance, fetchPerformanceAllPatients } from '../service/API/graphData';

const GraphDataContext = createContext({});

export const GraphDataProvider = function b({ children }) {
  const [loadingGraphs, setLoadingGraphs] = useState(false);
  const [loadingGraphsAllPatients, setLoadingGraphsAllPatients] = useState(false);

  const [enabled, setEnabled] = useState(false);
  const [success, setSuccess] = useState(false);
  const [averagePatient, setAveragePatient] = useState(null);
  const [averageAllPatients, setAverageAllPatients] = useState(null);

  const [token, setToken] = useState('');

  const [graph1, setGraph1] = useState({
    enabled: false,
  });

  const [graph2, setGraph2] = useState({
    enabled: false,
  });

  const [graph3, setGraph3] = useState({
    enabled: false,
  });

  const [graph1AllPatients, setGraph1AllPatients] = useState({
    enabled: false,
  });

  const [graph2AllPatients, setGraph2AllPatients] = useState({
    enabled: false,
  });

  const [graph3AllPatients, setGraph3AllPatients] = useState({
    enabled: false,
  });

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
  function formatDataToGraphNumberAllPatients(data) {
    const graphData = [];
    let count = 0;
    let value = 0;
    // eslint-disable-next-line array-callback-return
    data.map((envio) => {
      // graphData.push([count, parseFloat(envio.performances[0].value)]);
      value += parseFloat(envio.performances[0].value !== 'null' ? envio.performances[0].value : 0);
      count++;
    });
    return [[1, value / count]];
  }
  function formatDataToGraphBooleanProportion(data) {
    let yes = 0;
    let no = 0;
    // eslint-disable-next-line array-callback-return
    data.map((envio) => {
      // graphData.push([count, parseFloat(envio.performances[0].value)]);
      // count++;
      if (envio.performances[0].value === 'false') {
        no++;
      } else {
        yes++;
      }
    });

    return [['Sim', yes], ['Não', no]];
  }

  function formatDataToGraphBooleanProportionAllPatients(data) {
    let yes = 0;
    let no = 0;
    let count = 0;
    // eslint-disable-next-line array-callback-return
    data.map((envio) => {
      count++;
      if (envio.performances[0].value === 'false') {
        no++;
      } else {
        yes++;
      }
    });

    return [['Sim', yes / count], ['Não', no / count]];
  }

  function calculatePerformancePatient(activity, values, allPatients) {
    let performance = 0;
    let pesoTempoRestante = 1;
    let pesoTerminouATempo = 1;
    let pesoNumeroDeErros = 1;
    let pesoNumeroDeAcertos = 1;
    let pesoTempoDeReacaoTotal = 1;
    let pesoTempoDeReacaoMedio = 1;
    let pesoEscutasExtrasTotal = 1;
    let pesoEscutasExtrasMedio = 1;

    switch (activity) {
      case 'Jogo da memória':
        pesoTempoRestante = 1;
        pesoTerminouATempo = 1;
        pesoNumeroDeErros = 1;
        pesoNumeroDeAcertos = 1;
        performance = (
          (pesoTempoRestante * values.metricTempoRestanteAoFinalizar)
        + (pesoTerminouATempo * values.metricTerminouATempo)
        + (pesoNumeroDeErros * values.metricNumeroDeErros)
        + (pesoNumeroDeAcertos * values.metricNumeroDeAcertos)
        ) / (pesoTempoRestante + pesoTerminouATempo + pesoNumeroDeErros + pesoNumeroDeAcertos);
        break;
      case 'Para-Escuta-Para':
        pesoTempoDeReacaoTotal = 1;
        pesoTempoDeReacaoMedio = 1;
        pesoNumeroDeErros = 1;
        performance = (
          (pesoTempoDeReacaoTotal * values.metricTempoDeReacaoTotal)
        + (pesoTempoDeReacaoMedio * values.metricTempoDeReacaoMedio)
        + (pesoNumeroDeErros * values.metricNumeroDeErros)
        ) / (pesoTempoDeReacaoTotal + pesoTempoDeReacaoMedio + pesoNumeroDeErros);
        break;

      //   break;
      case 'Som Animal':
        pesoTempoDeReacaoTotal = 1;
        pesoTempoDeReacaoMedio = 1;
        pesoNumeroDeErros = 1;
        pesoNumeroDeAcertos = 1;
        performance = (
          (pesoTempoDeReacaoTotal * values.metricTempoDeReacaoTotal)
        + (pesoTempoDeReacaoMedio * values.metricTempoDeReacaoMedio)
        + (pesoNumeroDeErros * values.metricNumeroDeErros)
        + (pesoNumeroDeAcertos * values.metricNumeroDeAcertos)
        ) / (pesoTempoDeReacaoTotal + pesoTempoDeReacaoMedio + pesoNumeroDeErros + pesoNumeroDeAcertos);
        break;
      case 'Que frase é essa':
        pesoEscutasExtrasTotal = 1;
        pesoEscutasExtrasMedio = 1;
        pesoNumeroDeErros = 1;
        pesoNumeroDeAcertos = 1;
        performance = (
          (pesoEscutasExtrasTotal * values.metricEscutasExtrasTotal)
        + (pesoEscutasExtrasMedio * values.metricEscutasExtrasMedio)
        + (pesoNumeroDeErros * values.metricNumeroDeErros)
        + (pesoNumeroDeAcertos * values.metricNumeroDeAcertos)
        ) / (pesoEscutasExtrasTotal + pesoEscutasExtrasMedio + pesoNumeroDeErros + pesoNumeroDeAcertos);
        break;
      default:
        break;
    }
    if (allPatients) {
      setAverageAllPatients(performance.toFixed(2));
    } else {
      setAveragePatient(performance.toFixed(2));
    }
    return performance;
  }
  async function handleJogoMemoria(patient, activity) {
    let metricTempoRestanteAoFinalizar = activity.metrics.find((metric) => (metric.name === 'tempo restante ao finalizar'));
    let metricTerminouATempo = activity.metrics.find((metric) => (metric.name === 'terminou a tempo ?'));
    let metricNumeroDeErros = activity.metrics.find((metric) => (metric.name === 'numero de erros'));
    let metricNumeroDeAcertos = activity.metrics.find((metric) => (metric.name === 'numero de acertos'));

    let requestTempoRestanteAoFinalizar = {};

    let requestTerminouATempo = {};

    let requestNumeroDeErros = {};
    let requestNumeroDeAcertos = {};
    let averagePerformance = {};
    let haveActivity = false;
    if (patient != null) {
      setSuccess(false);
      setAveragePatient(null);
      requestTempoRestanteAoFinalizar = fetchPerformance({
        token,
        patient_id: patient,
        activity_id: activity.id,
        metric_id: metricTempoRestanteAoFinalizar.id,
      });

      requestTerminouATempo = fetchPerformance({
        token,
        patient_id: patient,
        activity_id: activity.id,
        metric_id: metricTerminouATempo.id,
      });

      requestNumeroDeErros = fetchPerformance({
        token,
        patient_id: patient,
        activity_id: activity.id,
        metric_id: metricNumeroDeErros.id,
      });
      requestNumeroDeAcertos = fetchPerformance({
        token,
        patient_id: patient,
        activity_id: activity.id,
        metric_id: metricNumeroDeAcertos.id,
      });

      await Promise.all([
        requestTempoRestanteAoFinalizar,
        requestTerminouATempo,
        requestNumeroDeErros,
        requestNumeroDeAcertos])
        .then((responses) => {
          if (responses[0].status === 200
          && responses[1].status === 200
          && responses[2].status === 200
          && responses[3].status === 200) {
            if (responses[0].data.length !== 0) {
              haveActivity = true;
              metricTempoRestanteAoFinalizar = formatDataToGraphNumberAllPatients(responses[0].data);
              metricTerminouATempo = formatDataToGraphBooleanProportionAllPatients(responses[1].data);
              metricNumeroDeErros = formatDataToGraphNumberAllPatients(responses[2].data);
              metricNumeroDeAcertos = formatDataToGraphNumberAllPatients(responses[3].data);
              averagePerformance = {
                metricTempoRestanteAoFinalizar: metricTempoRestanteAoFinalizar[0][1],
                metricTerminouATempo: metricTerminouATempo[0][1],
                metricNumeroDeErros: metricNumeroDeErros[0][1],
                metricNumeroDeAcertos: metricNumeroDeAcertos[0][1],
              };
              metricTempoRestanteAoFinalizar = formatDataToGraphNumber(responses[0].data);
              metricTerminouATempo = formatDataToGraphBooleanProportion(responses[1].data);
              metricNumeroDeErros = formatDataToGraphNumber(responses[2].data);
              metricNumeroDeAcertos = formatDataToGraphNumber(responses[3].data);
            } else {
              haveActivity = false;
            }
            setSuccess(true);
          }
        });
      if (haveActivity) {
        calculatePerformancePatient('Jogo da memória', averagePerformance, false);

        metricTempoRestanteAoFinalizar.unshift(['Envio', 'Tempo restante']);
        setGraph1({
          data: metricTempoRestanteAoFinalizar,
          options: {
            title: 'Tempo de atividade restante por envio (ms)',
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
        let acertos = 0;
        let erros = 0;
        for (let index = 0; index < metricNumeroDeAcertos.length; index++) {
          const element = metricNumeroDeErros[index][1];
          erros += element;
          acertos += metricNumeroDeAcertos[index][1];
          metricNumeroDeAcertos[index].push(element);
        }
        metricNumeroDeAcertos.unshift(['Envio', 'Acertos', 'Erros']);
        setGraph3({
          data: metricNumeroDeAcertos,
          options: {
            title: 'Erros e acertos por envio',
            legend: { position: 'bottom' },
            vAxis: { title: 'Quantidade' },
            hAxis: { title: 'Envio' },
            seriesType: 'bars',
          },
          chartType: 'ComboChart',
          enabled: true,
        });
      } else {
        setGraph1({ enabled: false });
        setGraph2({ enabled: false });
        setGraph3({ enabled: false });
      }
    } else {
      setAverageAllPatients(null);
      setGraph1({ enabled: false });
      setGraph2({ enabled: false });
      setGraph3({ enabled: false });
      setLoadingGraphsAllPatients(true);
      requestTempoRestanteAoFinalizar = fetchPerformanceAllPatients({
        token,
        activity_id: activity.id,
        metric_id: metricTempoRestanteAoFinalizar.id,
      });

      requestTerminouATempo = fetchPerformanceAllPatients({
        token,
        activity_id: activity.id,
        metric_id: metricTerminouATempo.id,
      });

      requestNumeroDeErros = fetchPerformanceAllPatients({
        token,
        activity_id: activity.id,
        metric_id: metricNumeroDeErros.id,
      });
      requestNumeroDeAcertos = fetchPerformanceAllPatients({
        token,
        activity_id: activity.id,
        metric_id: metricNumeroDeAcertos.id,
      });
      await Promise.all([
        requestTempoRestanteAoFinalizar,
        requestTerminouATempo,
        requestNumeroDeErros,
        requestNumeroDeAcertos])
        .then((responses) => {
          if (responses[0].status === 200
          && responses[1].status === 200
          && responses[2].status === 200
          && responses[3].status === 200) {
            if (responses[0].data.length !== 0) {
              haveActivity = true;
              metricTempoRestanteAoFinalizar = formatDataToGraphNumberAllPatients(responses[0].data);
              metricTerminouATempo = formatDataToGraphBooleanProportionAllPatients(responses[1].data);
              metricNumeroDeErros = formatDataToGraphNumberAllPatients(responses[2].data);
              metricNumeroDeAcertos = formatDataToGraphNumberAllPatients(responses[3].data);
              averagePerformance = {
                metricTempoRestanteAoFinalizar: metricTempoRestanteAoFinalizar[0][1],
                metricTerminouATempo: metricTerminouATempo[0][1],
                metricNumeroDeErros: metricNumeroDeErros[0][1],
                metricNumeroDeAcertos: metricNumeroDeAcertos[0][1],
              };
            } else {
              haveActivity = false;
            }
            setSuccess(true);
          }
        });

      if (haveActivity) {
        calculatePerformancePatient('Jogo da memória', averagePerformance, true);
        metricTempoRestanteAoFinalizar.unshift(['Envio', 'Tempo restante']);
        setGraph1AllPatients({
          data: metricTempoRestanteAoFinalizar,
          options: {
            title: 'Média de tempo de atividade restante por envio (ms)',
            legend: { position: 'bottom' },
          },
          chartType: 'LineChart',
          enabled: true,
        });

        metricTerminouATempo.unshift(['Proporção', 'Proporção de conclusão de atividade']);
        setGraph2AllPatients({
          data: metricTerminouATempo,
          options: {
            title: 'Proporção média de conclusão de atividade',
            is3D: true,
            legend: { position: 'bottom' },
          },
          chartType: 'PieChart',
          enabled: true,
        });
        let acertos = 0;
        let erros = 0;
        for (let index = 0; index < metricNumeroDeAcertos.length; index++) {
          const element = metricNumeroDeErros[index][1];
          erros += element;
          acertos += metricNumeroDeAcertos[index][1];
          metricNumeroDeAcertos[index].push(element);
        }
        metricNumeroDeAcertos.unshift(['Envio', 'Acertos', 'Erros']);
        setGraph3AllPatients({
          data: metricNumeroDeAcertos,
          options: {
            title: 'Média de erros e acertos por envio',
            legend: { position: 'bottom' },
          },
          chartType: 'ColumnChart',
          enabled: true,
        });
      }
      setLoadingGraphsAllPatients(false);
    }
    setLoadingGraphs(false);
  }

  async function handleParaEscutaPara(patient, activity) {
    setSuccess(false);
    let haveActivity = false;
    let metricTempoDeReacaoTotal = activity.metrics.find((metric) => (metric.name === 'tempo de reação total'));
    let metricTempoDeReacaoMedio = activity.metrics.find((metric) => (metric.name === 'tempo de reação médio'));
    let metricNumeroDeErros = activity.metrics.find((metric) => (metric.name === 'numero de erros'));

    let requestTempoDeReacaoTotal = {};
    let requestTempoDeReacaoMedio = {};
    let requestNumeroDeErros = {};

    let averagePerformance = {};

    if (patient != null) {
      setAveragePatient(null);
      setGraph1({ enabled: false });
      setGraph2({ enabled: false });
      setGraph3({ enabled: false });
      requestTempoDeReacaoTotal = fetchPerformance({
        token,
        patient_id: patient,
        activity_id: activity.id,
        metric_id: metricTempoDeReacaoTotal.id,
      });

      requestTempoDeReacaoMedio = fetchPerformance({
        token,
        patient_id: patient,
        activity_id: activity.id,
        metric_id: metricTempoDeReacaoMedio.id,
      });

      requestNumeroDeErros = fetchPerformance({
        token,
        patient_id: patient,
        activity_id: activity.id,
        metric_id: metricNumeroDeErros.id,
      });

      await Promise.all([
        requestTempoDeReacaoTotal,
        requestTempoDeReacaoMedio,
        requestNumeroDeErros])
        .then((responses) => {
          if (responses[0].status === 200
            && responses[1].status === 200
            && responses[2].status === 200) {
            if (responses[0].data.length !== 0) {
              haveActivity = true;
              metricTempoDeReacaoTotal = formatDataToGraphNumberAllPatients(responses[0].data);
              metricTempoDeReacaoMedio = formatDataToGraphNumberAllPatients(responses[1].data);
              metricNumeroDeErros = formatDataToGraphNumberAllPatients(responses[2].data);
              averagePerformance = {
                metricTempoDeReacaoTotal: metricTempoDeReacaoTotal[0][1],
                metricTempoDeReacaoMedio: metricTempoDeReacaoMedio[0][1],
                metricNumeroDeErros: metricNumeroDeErros[0][1],
              };
              metricTempoDeReacaoTotal = formatDataToGraphNumber(responses[0].data);
              metricTempoDeReacaoMedio = formatDataToGraphNumber(responses[1].data);
              metricNumeroDeErros = formatDataToGraphNumber(responses[2].data);
            } else {
              haveActivity = false;
            }
            setSuccess(true);
          }
        });

      if (haveActivity) {
        calculatePerformancePatient('Para-Escuta-Para', averagePerformance, false);

        for (let index = 0; index < metricTempoDeReacaoTotal.length; index++) {
          const element = metricTempoDeReacaoMedio[index][1];
          metricTempoDeReacaoTotal[index].push(element / 2);
        }
        metricTempoDeReacaoTotal.unshift(['Envio', 'Tempo de reação total', 'Tempo de reação médio']);

        setGraph1({
          data: metricTempoDeReacaoTotal,
          options: {
            title: 'Tempo de reação total e médio por envio (ms)',
            legend: { position: 'bottom' },
            vAxis: { title: 'Tempo em ms' },
            hAxis: { title: 'Envio' },
            seriesType: 'bars',
            series: { 1: { type: 'line' } },
          },
          chartType: 'ComboChart',
          enabled: true,
        });
        metricNumeroDeErros.unshift(['Proporção', 'Erros']);
        setGraph2({
          data: metricNumeroDeErros,
          options: {
            title: 'Erros por envio',
            legend: { position: 'bottom' },
          },
          chartType: 'ColumnChart',
          enabled: true,
        });
        setGraph3({ enabled: false });
      } else {
        setGraph1({ enabled: false });
        setGraph2({ enabled: false });
        setGraph3({ enabled: false });
      }
    } else { // get all patients data
      setAverageAllPatients(null);
      setLoadingGraphsAllPatients(true);
      setGraph1AllPatients({ enabled: false });
      setGraph2AllPatients({ enabled: false });
      setGraph3AllPatients({ enabled: false });
      requestTempoDeReacaoTotal = fetchPerformanceAllPatients({
        token,
        activity_id: activity.id,
        metric_id: metricTempoDeReacaoTotal.id,
      });

      requestTempoDeReacaoMedio = fetchPerformanceAllPatients({
        token,
        activity_id: activity.id,
        metric_id: metricTempoDeReacaoMedio.id,
      });

      requestNumeroDeErros = fetchPerformanceAllPatients({
        token,
        activity_id: activity.id,
        metric_id: metricNumeroDeErros.id,
      });

      await Promise.all([
        requestTempoDeReacaoTotal,
        requestTempoDeReacaoMedio,
        requestNumeroDeErros])
        .then((responses) => {
          if (responses[0].status === 200
            && responses[1].status === 200
            && responses[2].status === 200) {
            if (responses[0].data.length !== 0) {
              haveActivity = true;
              metricTempoDeReacaoTotal = formatDataToGraphNumberAllPatients(responses[0].data);
              metricTempoDeReacaoMedio = formatDataToGraphNumberAllPatients(responses[1].data);
              metricNumeroDeErros = formatDataToGraphNumberAllPatients(responses[2].data);
              averagePerformance = {
                metricTempoDeReacaoTotal: metricTempoDeReacaoTotal[0][1],
                metricTempoDeReacaoMedio: metricTempoDeReacaoMedio[0][1],
                metricNumeroDeErros: metricNumeroDeErros[0][1],
              };
            } else {
              haveActivity = false;
            }
            setSuccess(true);
          }
        });
      if (haveActivity) {
        calculatePerformancePatient('Para-Escuta-Para', averagePerformance, true);
        for (let index = 0; index < metricTempoDeReacaoTotal.length; index++) {
          const element = metricTempoDeReacaoMedio[index][1];
          metricTempoDeReacaoTotal[index].push(element / 2);
        }
        metricTempoDeReacaoTotal.unshift(['Envio', 'Tempo de reação total', 'Tempo de reação médio']);

        setGraph1AllPatients({
          data: metricTempoDeReacaoTotal,
          options: {
            title: 'Média de tempo de reação total e médio (ms)',
            legend: { position: 'bottom' },
            vAxis: { title: 'Tempo em ms' },
            hAxis: { title: 'Envio' },
            seriesType: 'bars',
            series: { 1: { type: 'line' } },
          },
          chartType: 'ComboChart',
          enabled: true,
        });
        metricNumeroDeErros.unshift(['Proporção', 'Erros']);
        setGraph2AllPatients({
          data: metricNumeroDeErros,
          options: {
            title: 'Média de erros por envio',
            legend: { position: 'bottom' },
          },
          chartType: 'ColumnChart',
          enabled: true,
        });
        setGraph3AllPatients({ enabled: false });
      }
      setLoadingGraphsAllPatients(false);
    }

    setLoadingGraphs(false);
  }

  async function handleSomAnimal(patient, activity) {
    setSuccess(false);
    let haveActivity = false;
    let metricTempoDeReacaoTotal = activity.metrics.find((metric) => (metric.name === 'tempo de reação total'));
    let metricTempoDeReacaoMedio = activity.metrics.find((metric) => (metric.name === 'tempo de reação médio'));
    let metricNumeroDeErros = activity.metrics.find((metric) => (metric.name === 'numero de erros'));
    let metricNumeroDeAcertos = activity.metrics.find((metric) => (metric.name === 'numero de acertos'));

    let requestTempoDeReacaoTotal = {};
    let requestTempoDeReacaoMedio = {};
    let requestNumeroDeErros = {};
    let requestNumeroDeAcertos = {};
    let averagePerformance = {};

    if (patient != null) {
      setAveragePatient(null);
      setGraph1({ enabled: false });
      setGraph2({ enabled: false });
      setGraph3({ enabled: false });
      requestTempoDeReacaoTotal = fetchPerformance({
        token,
        patient_id: patient,
        activity_id: activity.id,
        metric_id: metricTempoDeReacaoTotal.id,
      });

      requestTempoDeReacaoMedio = fetchPerformance({
        token,
        patient_id: patient,
        activity_id: activity.id,
        metric_id: metricTempoDeReacaoMedio.id,
      });
      requestNumeroDeErros = fetchPerformance({
        token,
        patient_id: patient,
        activity_id: activity.id,
        metric_id: metricNumeroDeErros.id,
      });
      requestNumeroDeAcertos = fetchPerformance({
        token,
        patient_id: patient,
        activity_id: activity.id,
        metric_id: metricNumeroDeAcertos.id,
      });

      await Promise.all([
        requestTempoDeReacaoTotal,
        requestTempoDeReacaoMedio,
        requestNumeroDeErros,
        requestNumeroDeAcertos])
        .then((responses) => {
          if (responses[0].status === 200
            && responses[1].status === 200
            && responses[2].status === 200) {
            if (responses[0].data.length !== 0) {
              haveActivity = true;
              metricTempoDeReacaoTotal = formatDataToGraphNumberAllPatients(responses[0].data);
              metricTempoDeReacaoMedio = formatDataToGraphNumberAllPatients(responses[1].data);
              metricNumeroDeErros = formatDataToGraphNumberAllPatients(responses[2].data);
              metricNumeroDeAcertos = formatDataToGraphNumberAllPatients(responses[3].data);
              averagePerformance = {
                metricTempoDeReacaoTotal: metricTempoDeReacaoTotal[0][1],
                metricTempoDeReacaoMedio: metricTempoDeReacaoMedio[0][1],
                metricNumeroDeErros: metricNumeroDeErros[0][1],
                metricNumeroDeAcertos: metricNumeroDeAcertos[0][1],
              };
              metricTempoDeReacaoTotal = formatDataToGraphNumber(responses[0].data);
              metricTempoDeReacaoMedio = formatDataToGraphNumber(responses[1].data);
              metricNumeroDeErros = formatDataToGraphNumber(responses[2].data);
              metricNumeroDeAcertos = formatDataToGraphNumber(responses[3].data);
            } else {
              haveActivity = false;
            }
            setSuccess(true);
          }
        });

      if (haveActivity) {
        calculatePerformancePatient('Som Animal', averagePerformance, false);
        for (let index = 0; index < metricTempoDeReacaoTotal.length; index++) {
          const element = metricTempoDeReacaoMedio[index][1];
          metricTempoDeReacaoTotal[index].push(element);
        }
        metricTempoDeReacaoTotal.unshift(['Envio', 'Tempo de reação total', 'Tempo de reação médio']);

        setGraph1({
          data: metricTempoDeReacaoTotal,
          options: {
            title: 'Tempo de reação total e médio (ms)',
            legend: { position: 'bottom' },
            vAxis: { title: 'Tempo em ms' },
            hAxis: { title: 'Envio' },
            seriesType: 'bars',
            series: { 1: { type: 'line' } },
          },
          chartType: 'ComboChart',
          enabled: true,
        });
        let acertos = 0;
        let erros = 0;
        for (let index = 0; index < metricNumeroDeAcertos.length; index++) {
          const element = metricNumeroDeErros[index][1];
          erros += element;
          acertos += metricNumeroDeAcertos[index][1];
          metricNumeroDeAcertos[index].push(element);
        }
        const proporcaoAcertoErroGraph = [['Proporção', 'Proporção de acertos e erros total'], ['Acertos', acertos], ['Erros', erros]];
        setGraph2({
          data: proporcaoAcertoErroGraph,
          options: {
            title: 'Proporção de acertos e erros total',
            is3D: true,
            legend: { position: 'bottom' },
          },
          chartType: 'PieChart',
          enabled: true,
        });
        metricNumeroDeAcertos.unshift(['Envio', 'Acertos', 'Erros']);
        setGraph3({
          data: metricNumeroDeAcertos,
          options: {
            title: 'Erros e acertos por envio',
            legend: { position: 'bottom' },
            vAxis: { title: 'Quantidade' },
            hAxis: { title: 'Envio' },
            seriesType: 'bars',
          },
          chartType: 'ComboChart',
          enabled: true,
        });
      } else {
        setGraph1({ enabled: false });
        setGraph2({ enabled: false });
        setGraph3({ enabled: false });
      }
      setLoadingGraphs(false);
    } else {
      setAverageAllPatients(null);
      setLoadingGraphsAllPatients(true);
      setGraph1AllPatients({ enabled: false });
      setGraph2AllPatients({ enabled: false });
      setGraph3AllPatients({ enabled: false });
      requestTempoDeReacaoTotal = fetchPerformanceAllPatients({
        token,
        activity_id: activity.id,
        metric_id: metricTempoDeReacaoTotal.id,
      });

      requestTempoDeReacaoMedio = fetchPerformanceAllPatients({
        token,
        activity_id: activity.id,
        metric_id: metricTempoDeReacaoMedio.id,
      });
      requestNumeroDeErros = fetchPerformanceAllPatients({
        token,
        activity_id: activity.id,
        metric_id: metricNumeroDeErros.id,
      });
      requestNumeroDeAcertos = fetchPerformanceAllPatients({
        token,
        activity_id: activity.id,
        metric_id: metricNumeroDeAcertos.id,
      });

      await Promise.all([
        requestTempoDeReacaoTotal,
        requestTempoDeReacaoMedio,
        requestNumeroDeErros,
        requestNumeroDeAcertos])
        .then((responses) => {
          if (responses[0].status === 200
          && responses[1].status === 200
          && responses[2].status === 200) {
            if (responses[0].data.length !== 0) {
              haveActivity = true;
              metricTempoDeReacaoTotal = formatDataToGraphNumberAllPatients(responses[0].data);
              metricTempoDeReacaoMedio = formatDataToGraphNumberAllPatients(responses[1].data);
              metricNumeroDeErros = formatDataToGraphNumberAllPatients(responses[2].data);
              metricNumeroDeAcertos = formatDataToGraphNumberAllPatients(responses[3].data);
              averagePerformance = {
                metricTempoDeReacaoTotal: metricTempoDeReacaoTotal[0][1],
                metricTempoDeReacaoMedio: metricTempoDeReacaoMedio[0][1],
                metricNumeroDeErros: metricNumeroDeErros[0][1],
                metricNumeroDeAcertos: metricNumeroDeAcertos[0][1],
              };
            } else {
              haveActivity = false;
            }
            setSuccess(true);
          }
        });
      if (haveActivity) {
        calculatePerformancePatient('Som Animal', averagePerformance, true);
        for (let index = 0; index < metricTempoDeReacaoTotal.length; index++) {
          const element = metricTempoDeReacaoMedio[index][1];
          metricTempoDeReacaoTotal[index].push(element);
        }
        metricTempoDeReacaoTotal.unshift(['Envio', 'Tempo de reação total', 'Tempo de reação médio']);

        setGraph1AllPatients({
          data: metricTempoDeReacaoTotal,
          options: {
            title: 'Média de tempo de reação total e médio (ms)',
            legend: { position: 'bottom' },
            vAxis: { title: 'Tempo em ms' },
            hAxis: { title: 'Envio' },
            seriesType: 'bars',
            series: { 1: { type: 'line' } },
          },
          chartType: 'ComboChart',
          enabled: true,
        });
        let acertos = 0;
        let erros = 0;
        for (let index = 0; index < metricNumeroDeAcertos.length; index++) {
          const element = metricNumeroDeErros[index][1];
          erros += element;
          acertos += metricNumeroDeAcertos[index][1];
          metricNumeroDeAcertos[index].push(element);
        }
        const proporcaoAcertoErroGraph = [['Proporção', 'Proporção da de acertos e erros total'], ['Acertos', acertos], ['Erros', erros]];
        setGraph2AllPatients({
          data: proporcaoAcertoErroGraph,
          options: {
            title: 'Proporção da média acertos e erros total',
            is3D: true,
            legend: { position: 'bottom' },
          },
          chartType: 'PieChart',
          enabled: true,
        });
        metricNumeroDeAcertos.unshift(['Envio', 'Acertos', 'Erros']);
        setGraph3AllPatients({
          data: metricNumeroDeAcertos,
          options: {
            title: 'Média de erros e acertos por envio',
            legend: { position: 'bottom' },
            vAxis: { title: 'Quantidade' },
            hAxis: { title: 'Envio' },
            seriesType: 'bars',
          },
          chartType: 'ComboChart',
          enabled: true,
        });
      }
      setLoadingGraphsAllPatients(false);
    }
  }

  async function handleQueSom(patient, activity) {
    setSuccess(false);
    let haveActivity = false;
    let metricEscutasExtrasTotal = activity.metrics.find((metric) => (metric.name === 'escutas extras (total)'));
    let metricEscutasExtrasMedio = activity.metrics.find((metric) => (metric.name === 'escutas extras (média)'));
    let metricNumeroDeErros = activity.metrics.find((metric) => (metric.name === 'numero de erros'));
    let metricNumeroDeAcertos = activity.metrics.find((metric) => (metric.name === 'numero de acertos'));

    let requestEscutasExtrasTotal = {};
    let requestEscutasExtrasMedio = {};
    let requestNumeroDeErros = {};
    let requestNumeroDeAcertos = {};
    let averagePerformance = { };
    if (patient != null) {
      setAveragePatient(null);
      setGraph1({ enabled: false });
      setGraph2({ enabled: false });
      setGraph3({ enabled: false });
      requestEscutasExtrasTotal = fetchPerformance({
        token,
        patient_id: patient,
        activity_id: activity.id,
        metric_id: metricEscutasExtrasTotal.id,
      });

      requestEscutasExtrasMedio = fetchPerformance({
        token,
        patient_id: patient,
        activity_id: activity.id,
        metric_id: metricEscutasExtrasMedio.id,
      });
      requestNumeroDeErros = fetchPerformance({
        token,
        patient_id: patient,
        activity_id: activity.id,
        metric_id: metricNumeroDeErros.id,
      });
      requestNumeroDeAcertos = fetchPerformance({
        token,
        patient_id: patient,
        activity_id: activity.id,
        metric_id: metricNumeroDeAcertos.id,
      });

      await Promise.all([
        requestEscutasExtrasTotal,
        requestEscutasExtrasMedio,
        requestNumeroDeErros,
        requestNumeroDeAcertos])
        .then((responses) => {
          if (responses[0].status === 200
            && responses[1].status === 200
            && responses[2].status === 200) {
            if (responses[0].data.length !== 0) {
              haveActivity = true;
              metricEscutasExtrasTotal = formatDataToGraphNumberAllPatients(responses[0].data);
              metricEscutasExtrasMedio = formatDataToGraphNumberAllPatients(responses[1].data);
              metricNumeroDeErros = formatDataToGraphNumberAllPatients(responses[2].data);
              metricNumeroDeAcertos = formatDataToGraphNumberAllPatients(responses[3].data);
              averagePerformance = {
                metricEscutasExtrasTotal: metricEscutasExtrasTotal[0][1],
                metricEscutasExtrasMedio: metricEscutasExtrasMedio[0][1],
                metricNumeroDeErros: metricNumeroDeErros[0][1],
                metricNumeroDeAcertos: metricNumeroDeAcertos[0][1],
              };
              metricEscutasExtrasTotal = formatDataToGraphNumber(responses[0].data);
              metricEscutasExtrasMedio = formatDataToGraphNumber(responses[1].data);
              metricNumeroDeErros = formatDataToGraphNumber(responses[2].data);
              metricNumeroDeAcertos = formatDataToGraphNumber(responses[3].data);
            } else {
              haveActivity = false;
            }
            setSuccess(true);
          }
        });

      if (haveActivity) {
        calculatePerformancePatient('Que frase é essa', averagePerformance, false);

        for (let index = 0; index < metricEscutasExtrasTotal.length; index++) {
          const element = metricEscutasExtrasMedio[index][1];
          metricEscutasExtrasTotal[index].push(element);
        }
        metricEscutasExtrasTotal.unshift(['Envio', 'Escutas extras totais', 'Escutas extras média']);

        setGraph1({
          data: metricEscutasExtrasTotal,
          options: {
            title: 'Escutas extras totais e médias (ms)',
            legend: { position: 'bottom' },
            vAxis: { title: 'Escutas' },
            hAxis: { title: 'Envio' },
            seriesType: 'bars',
            series: { 1: { type: 'line' } },
          },
          chartType: 'ComboChart',
          enabled: true,
        });
        let acertos = 0;
        let erros = 0;
        for (let index = 0; index < metricNumeroDeAcertos.length; index++) {
          const element = metricNumeroDeErros[index][1];
          erros += element;
          acertos += metricNumeroDeAcertos[index][1];
          metricNumeroDeAcertos[index].push(element);
        }
        const proporcaoAcertoErroGraph = [['Proporção', 'Proporção de acertos e erros total'], ['Acertos', acertos], ['Erros', erros]];
        setGraph2({
          data: proporcaoAcertoErroGraph,
          options: {
            title: 'Proporção de acertos e erros total',
            is3D: true,
            legend: { position: 'bottom' },
          },
          chartType: 'PieChart',
          enabled: true,
        });
        metricNumeroDeAcertos.unshift(['Envio', 'Acertos', 'Erros']);
        setGraph3({
          data: metricNumeroDeAcertos,
          options: {
            title: 'Erros e acertos por envio',
            legend: { position: 'bottom' },
            vAxis: { title: 'Quantidade' },
            hAxis: { title: 'Envio' },
            seriesType: 'bars',
          },
          chartType: 'ComboChart',
          enabled: true,
        });
      } else {
        setGraph1({ enabled: false });
        setGraph2({ enabled: false });
        setGraph3({ enabled: false });
      }
      setLoadingGraphs(false);
    } else {
      setAverageAllPatients(null);
      setLoadingGraphsAllPatients(true);
      setGraph1AllPatients({ enabled: false });
      setGraph2AllPatients({ enabled: false });
      setGraph3AllPatients({ enabled: false });
      requestEscutasExtrasTotal = fetchPerformanceAllPatients({
        token,
        activity_id: activity.id,
        metric_id: metricEscutasExtrasTotal.id,
      });

      requestEscutasExtrasMedio = fetchPerformanceAllPatients({
        token,
        activity_id: activity.id,
        metric_id: metricEscutasExtrasMedio.id,
      });
      requestNumeroDeErros = fetchPerformanceAllPatients({
        token,
        activity_id: activity.id,
        metric_id: metricNumeroDeErros.id,
      });
      requestNumeroDeAcertos = fetchPerformanceAllPatients({
        token,
        activity_id: activity.id,
        metric_id: metricNumeroDeAcertos.id,
      });

      await Promise.all([
        requestEscutasExtrasTotal,
        requestEscutasExtrasMedio,
        requestNumeroDeErros,
        requestNumeroDeAcertos])
        .then((responses) => {
          if (responses[0].status === 200
          && responses[1].status === 200
          && responses[2].status === 200) {
            if (responses[0].data.length !== 0) {
              haveActivity = true;
              metricEscutasExtrasTotal = formatDataToGraphNumberAllPatients(responses[0].data);
              metricEscutasExtrasMedio = formatDataToGraphNumberAllPatients(responses[1].data);
              metricNumeroDeErros = formatDataToGraphNumberAllPatients(responses[2].data);
              metricNumeroDeAcertos = formatDataToGraphNumberAllPatients(responses[3].data);
              averagePerformance = {
                metricEscutasExtrasTotal: metricEscutasExtrasTotal[0][1],
                metricEscutasExtrasMedio: metricEscutasExtrasMedio[0][1],
                metricNumeroDeErros: metricNumeroDeErros[0][1],
                metricNumeroDeAcertos: metricNumeroDeAcertos[0][1],
              };
            } else {
              haveActivity = false;
            }
            setSuccess(true);
          }
        });
      if (haveActivity) {
        calculatePerformancePatient('Que frase é essa', averagePerformance, true);
        for (let index = 0; index < metricEscutasExtrasTotal.length; index++) {
          const element = metricEscutasExtrasMedio[index][1];
          metricEscutasExtrasTotal[index].push(element);
        }
        metricEscutasExtrasTotal.unshift(['Envio', 'Escutas extras totais', 'Escutas extras média']);

        setGraph1AllPatients({
          data: metricEscutasExtrasTotal,
          options: {
            title: 'Média de escutas extras totais e médias (ms)',
            legend: { position: 'bottom' },
            vAxis: { title: 'Tempo em ms' },
            hAxis: { title: 'Envio' },
            seriesType: 'bars',
            series: { 1: { type: 'line' } },
          },
          chartType: 'ComboChart',
          enabled: true,
        });
        let acertos = 0;
        let erros = 0;
        for (let index = 0; index < metricNumeroDeAcertos.length; index++) {
          const element = metricNumeroDeErros[index][1];
          erros += element;
          acertos += metricNumeroDeAcertos[index][1];
          metricNumeroDeAcertos[index].push(element);
        }
        const proporcaoAcertoErroGraph = [['Proporção', 'Proporção da de acertos e erros total'], ['Acertos', acertos], ['Erros', erros]];
        setGraph2AllPatients({
          data: proporcaoAcertoErroGraph,
          options: {
            title: 'Proporção da média acertos e erros total',
            is3D: true,
            legend: { position: 'bottom' },
          },
          chartType: 'PieChart',
          enabled: true,
        });
        metricNumeroDeAcertos.unshift(['Envio', 'Acertos', 'Erros']);
        setGraph3AllPatients({
          data: metricNumeroDeAcertos,
          options: {
            title: 'Média de erros e acertos por envio',
            legend: { position: 'bottom' },
            vAxis: { title: 'Quantidade' },
            hAxis: { title: 'Envio' },
            seriesType: 'bars',
          },
          chartType: 'ComboChart',
          enabled: true,
        });
      }
      setLoadingGraphsAllPatients(false);
    }
  }

  const handleGraph = (patient, activity, activities) => {
    const selectedActivity = activities.filter((act) => {
      if (act.id === activity) {
        return true;
      }
      return false;
    });
    setLoadingGraphs(true);
    switch (selectedActivity[0].name) {
      case 'Jogo da memória':
        handleJogoMemoria(patient, selectedActivity[0]);
        handleJogoMemoria(null, selectedActivity[0]);
        break;
      case 'Para-Escuta-Para':
        handleParaEscutaPara(patient, selectedActivity[0]);
        handleParaEscutaPara(null, selectedActivity[0]);

        break;
      case 'Som Animal':
        handleSomAnimal(patient, selectedActivity[0]);
        handleSomAnimal(null, selectedActivity[0]);
        break;
      case 'Que frase é essa':
        handleQueSom(patient, selectedActivity[0]);
        handleQueSom(null, selectedActivity[0]);
        break;
      default:
        break;
    }
    setEnabled(true);
  };
  return (
    <GraphDataContext.Provider
      value={{
        graph1,
        graph2,
        graph3,
        graph1AllPatients,
        graph2AllPatients,
        graph3AllPatients,
        handleGraph,
        setEnabled,
        loadingGraphs,
        loadingGraphsAllPatients,
        enabled,
        setToken,
        success,
        averagePatient,
        averageAllPatients,
      }}
    >
      {children}
    </GraphDataContext.Provider>
  );
};
export const GraphDataContextConsumer = GraphDataContext.Consumer;

export default GraphDataContext;
