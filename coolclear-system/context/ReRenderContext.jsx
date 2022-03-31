/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */

import React, { createContext, useState } from 'react';

const ReRenderContext = createContext({});

export const ReRenderProvider = function b({ children }) {
  const [reRender, setReRender] = useState(false);
  const [update, setUpdate] = useState(false);
  const [triggerReRender, setTriggerReRender] = useState(false);
  const [triggerUpdate, setTriggerUpdate] = useState(false);

  const forceReRender = () => {
    setTriggerReRender((currState) => !currState);
  };
  const forceUpdate = () => {
    setTriggerUpdate((currState) => !currState);
  };
  return (
    <ReRenderContext.Provider
      value={{
        forceReRender,
        triggerReRender,
        triggerUpdate,
        reRender,
        setReRender,
        update,
        setUpdate,
        forceUpdate,
      }}
    >
      {children}
    </ReRenderContext.Provider>
  );
};
export const ReRenderContextConsumer = ReRenderContext.Consumer;

export default ReRenderContext;
