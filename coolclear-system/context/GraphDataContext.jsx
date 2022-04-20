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
    let metricTempoRestanteAoFinalizar = activity.metrics.find((metric) => (metric.name === 'tempo restante ao finalizar'));
    let metricTerminouATempo = activity.metrics.find((metric) => (metric.name === 'terminou a tempo ?'));
    let metricNumeroDeErros = activity.metrics.find((metric) => (metric.name === 'numero de erros'));

    let requestTempoRestanteAoFinalizar = {};

    let requestTerminouATempo = {};

    let requestNumeroDeErros = {};
    let haveActivity = false;
    if (patient != null) {
      setSuccess(false);
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

      await Promise.all([
        requestTempoRestanteAoFinalizar,
        requestTerminouATempo,
        requestNumeroDeErros])
        .then((responses) => {
          if (responses[0].status === 200
          && responses[1].status === 200
          && responses[2].status === 200) {
            if (responses[0].data.length !== 0) {
              haveActivity = true;

              metricTempoRestanteAoFinalizar = formatDataToGraphNumber(responses[0].data);
              metricTerminouATempo = formatDataToGraphBooleanProportion(responses[1].data);
              metricNumeroDeErros = formatDataToGraphNumber(responses[2].data);
            } else {
              haveActivity = false;
            }
            setSuccess(true);
          }
        });

      if (haveActivity) {
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
      } else {
        setGraph1({ enabled: false });
        setGraph2({ enabled: false });
        setGraph3({ enabled: false });
      }
    } else {
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
        metric_id: metricTempoRestanteAoFinalizar.id,
      });

      requestNumeroDeErros = fetchPerformanceAllPatients({
        token,
        activity_id: activity.id,
        metric_id: metricTempoRestanteAoFinalizar.id,
      });

      await Promise.all([
        requestTempoRestanteAoFinalizar,
        requestTerminouATempo,
        requestNumeroDeErros])
        .then((responses) => {
          if (responses[0].status === 200
          && responses[1].status === 200
          && responses[2].status === 200) {
            if (responses[0].data.length !== 0) {
              haveActivity = true;

              metricTempoRestanteAoFinalizar = formatDataToGraphNumber(responses[0].data);
              metricTerminouATempo = formatDataToGraphBooleanProportion(responses[1].data);
              metricNumeroDeErros = formatDataToGraphNumber(responses[2].data);
            } else {
              haveActivity = false;
            }
            setSuccess(true);
          }
        });

      if (haveActivity) {
        metricTempoRestanteAoFinalizar.unshift(['Envio', 'Tempo restante']);
        setGraph1AllPatients({
          data: metricTempoRestanteAoFinalizar,
          options: {
            title: 'Tempo de atividade restante por envio',
            legend: { position: 'bottom' },
          },
          chartType: 'LineChart',
          enabled: true,
        });

        metricTerminouATempo.unshift(['Proporção', 'Proporção de conclusão de atividade']);
        setGraph2AllPatients({
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
        setGraph3AllPatients({
          data: metricNumeroDeErros,
          options: {
            title: 'Erros por envio',
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

    if (patient != null) {
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
        for (let index = 0; index < metricTempoDeReacaoTotal.length; index++) {
          const element = metricTempoDeReacaoMedio[index][1];
          metricTempoDeReacaoTotal[index].push(element / 2);
        }
        metricTempoDeReacaoTotal.unshift(['Envio', 'Tempo de reação total', 'Tempo de reação médio']);

        setGraph1({
          data: metricTempoDeReacaoTotal,
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
        metric_id: metricTempoDeReacaoTotal.id,
      });

      requestNumeroDeErros = fetchPerformanceAllPatients({
        token,
        activity_id: activity.id,
        metric_id: metricTempoDeReacaoTotal.id,
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
        for (let index = 0; index < metricTempoDeReacaoTotal.length; index++) {
          const element = metricTempoDeReacaoMedio[index][1];
          metricTempoDeReacaoTotal[index].push(element / 2);
        }
        metricTempoDeReacaoTotal.unshift(['Envio', 'Tempo de reação total', 'Tempo de reação médio']);

        setGraph1AllPatients({
          data: metricTempoDeReacaoTotal,
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
        metricNumeroDeErros.unshift(['Proporção', 'Erros']);
        setGraph2AllPatients({
          data: metricNumeroDeErros,
          options: {
            title: 'Erros por envio',
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

    if (patient != null) {
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
        for (let index = 0; index < metricTempoDeReacaoTotal.length; index++) {
          const element = metricTempoDeReacaoMedio[index][1];
          metricTempoDeReacaoTotal[index].push(element / 2);
        }
        metricTempoDeReacaoTotal.unshift(['Envio', 'Tempo de reação total', 'Tempo de reação médio']);

        setGraph1({
          data: metricTempoDeReacaoTotal,
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
        metric_id: metricTempoDeReacaoTotal.id,
      });
      requestNumeroDeErros = fetchPerformanceAllPatients({
        token,
        activity_id: activity.id,
        metric_id: metricTempoDeReacaoTotal.id,
      });
      requestNumeroDeAcertos = fetchPerformanceAllPatients({
        token,
        activity_id: activity.id,
        metric_id: metricTempoDeReacaoTotal.id,
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
        for (let index = 0; index < metricTempoDeReacaoTotal.length; index++) {
          const element = metricTempoDeReacaoMedio[index][1];
          metricTempoDeReacaoTotal[index].push(element / 2);
        }
        metricTempoDeReacaoTotal.unshift(['Envio', 'Tempo de reação total', 'Tempo de reação médio']);

        setGraph1AllPatients({
          data: metricTempoDeReacaoTotal,
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
        let acertos = 0;
        let erros = 0;
        for (let index = 0; index < metricNumeroDeAcertos.length; index++) {
          const element = metricNumeroDeErros[index][1];
          erros += element;
          acertos += metricNumeroDeAcertos[index][1];
          metricNumeroDeAcertos[index].push(element);
        }
        const proporcaoAcertoErroGraph = [['Proporção', 'Proporção de acertos e erros total'], ['Acertos', acertos], ['Erros', erros]];
        setGraph2AllPatients({
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
        setGraph3AllPatients({
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
    // if (selectedActivity[0].name ===)
    // console.log("selecionada",selectedActivity);
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
      }}
    >
      {children}
    </GraphDataContext.Provider>
  );
};
export const GraphDataContextConsumer = GraphDataContext.Consumer;

export default GraphDataContext;
