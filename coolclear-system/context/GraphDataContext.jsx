/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */

import React, { createContext, useState } from 'react';

const GraphDataContext = createContext({});

export const GraphDataProvider = function b({ children }) {
  const [loadingGraphs, setLoadingGraphs] = useState(false);
  const [enabled, setEnabled] = useState(false);

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
  function handleJogoMemoria(patient) {
    setGraph1({
      data: [
        ['Envio', 'Tempo restante'],
        ['1', 1000],
        ['2', 1170],
        ['3', 660],
        ['4', 1030],
      ],
      options: {
        title: 'Tempo de atividade restante por envio',
        legend: { position: 'bottom' },
      },
      chartType: 'LineChart',
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

  function handleParaEscutaPara(patient) {
    console.log('para escuta para');
    setLoadingGraphs(false);
  }
  const handleGraph = (patient, activity, metric) => {
    setLoadingGraphs(true);
    switch (activity) {
      case '75e3715c-957c-495f-9ada-0bb388af8f42':
        handleJogoMemoria(patient);
        break;
      case '9aa172f0-78c8-4359-bde1-d95b6755ef46':
        handleParaEscutaPara(patient);
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
      }}
    >
      {children}
    </GraphDataContext.Provider>
  );
};
export const GraphDataContextConsumer = GraphDataContext.Consumer;

export default GraphDataContext;
