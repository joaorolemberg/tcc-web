/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */

import React, { createContext, useState } from 'react';

const GraphDataContext = createContext({});

export const GraphDataProvider = function b({ children }) {
  const [loadingGraphs, setLoadingGraphs] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const [lineGraphDataPatient, setLineGraphDataPatient] = useState({
    data: [
      ['Envio', 'Métrica X'],
      ['1', 1000],
      ['2', 1170],
      ['3', 660],
      ['4', 1030],
    ],
    options: {
      title: 'Acompanhamento de valor por envio',
      legend: { position: 'bottom' },
    },
    chartType: 'LineChart',
  });
  const [lineGraphDataAllPatients, setLineGraphDataAllPatients] = useState({

  });

  const [pizzaGraphDataPatient, setPizzaGraphDataPatient] = useState({
    data: [
      ['Proporção', 'Quantidade de coisas'],
      ['Acertos', 40],
      ['Erros', 60],
    ],
    options: {
      title: 'Proporção Acerto x Erro',
      is3D: true,
    },
    chartType: 'PieChart',
  });
  const [pizzaGraphDataAllPatients, setPizzaGraphDataAllPatients] = useState(false);

  const [barGraphDataPatient, setBarGraphDataPatient] = useState(false);
  const [barGraphDataAllPatients, setBarGraphDataAllPatients] = useState(false);

  //   const [GraphDataPatient, GraphDataPatient] = useState(false);
  //   const [GraphDataAllPatients, GraphDataAllPatients] = useState(false);

  const handleGraph = (patient, activity, metric) => {
    setLoadingGraphs(true);
    setEnabled(true);
    setTimeout(() => {
      setLoadingGraphs(false);
    }, 3000);
  };
  //   const forceUpdate = () => {
  //     setTriggerUpdate((currState) => !currState);
  //   };
  return (
    <GraphDataContext.Provider
      value={{
        lineGraphDataPatient,
        lineGraphDataAllPatients,
        pizzaGraphDataPatient,
        pizzaGraphDataAllPatients,
        barGraphDataPatient,
        barGraphDataAllPatients,
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
