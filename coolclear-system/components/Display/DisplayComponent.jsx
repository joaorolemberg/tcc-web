/* eslint-disable react/prop-types */
import React from 'react';

const DisplayComponent = function a({
  showAt,
  hideAt,
  children,
}) {
  if (showAt) {
    return (
      <div className={`d-none d-${showAt}-block`}>
        {children}
      </div>
    );
  }
  return (
    <div className={`d-${hideAt}-none`}>
      {children}
    </div>
  );
};

export default DisplayComponent;
