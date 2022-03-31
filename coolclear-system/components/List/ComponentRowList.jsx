/* eslint-disable react/prop-types */
import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

const ComponentRowList = function a({ Component, list }) {
  if (list.length === 0) {
    return (
      <div>
        <ListGroup className="mb-2 text-center">
          <h4>Não há dados a serem exibidos</h4>
        </ListGroup>
      </div>
    );
  }
  return (
    <div>
      <ListGroup className="mb-2 ">
        {list.map((item) => (
          <ListGroupItem action key={item.id}>
            <Component data={item} />
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

export default ComponentRowList;
