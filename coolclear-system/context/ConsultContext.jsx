/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */

import React, { createContext, useState } from 'react';

const ConsultContext = createContext({});

export const ConsultProvider = function b({ children }) {
  const [consult, setConsult] = useState(null);
  const [lastsConsults, setLastsConsults] = useState({});
  const [actualActivities, setActualActivities] = useState({});

//   const forceReRender = () => {
//     setTriggerReRender((currState) => !currState);
//   };
//   const forceUpdate = () => {
//     setTriggerUpdate((currState) => !currState);
//   };
  return (
    <ConsultContext.Provider
      value={{
        consult,
        setConsult,
      }}
    >
      {children}
    </ConsultContext.Provider>
  );
};
export const ReRenderContextConsumer = ConsultContext.Consumer;

export default ConsultContext;
