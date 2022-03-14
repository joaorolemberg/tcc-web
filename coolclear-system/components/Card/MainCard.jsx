/* eslint-disable react/prop-types */
import React from 'react';
import {
  Card,
} from 'reactstrap';
import SimplePagination from '../Pagination/SimplePagination';
import MainCardHeader from './MainCardHeader';

const MainCard = function b({
  title, search, add, children, pagination,
}) {
  return (
    <Card body>
      <div
        style={{
          borderStyle: 'solid',
          borderColor: 'lightgrey',
          borderWidth: '0px 0px 2px 0px',
          paddingTop: '10px',
          paddingBottom: '10px',
          marginBottom: '15px',
        }}
      >
        <MainCardHeader title={title} add={add} search={search} />
      </div>
      {children}
      {pagination
        ? (
          <div
            style={{
              borderStyle: 'solid',
              borderColor: 'lightgrey',
              borderWidth: '2px 0px 0px 0px',
            }}
          >
            <SimplePagination />
          </div>
        )
        : <div />}

    </Card>
  );
};

export default MainCard;
