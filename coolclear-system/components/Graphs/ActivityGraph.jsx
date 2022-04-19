/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Chart } from 'react-google-charts';

// export const data = [
//   ['Year', 'Sales', 'Expenses'],
//   ['2004', 1000, 400],
//   ['2005', 1170, 460],
//   ['2006', 660, 1120],
//   ['2007', 1030, 540],
// ];

// export const options = {
//   title: 'Company Performance',
//   curveType: 'function',
//   legend: { position: 'bottom' },
// };
function ActivityGraph({ options, data, chartType }) {
  return (
    <div>
      <Chart
        chartType={chartType}
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
}

export default ActivityGraph;
