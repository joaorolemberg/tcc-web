/* eslint-disable react/prop-types */
import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

const ComponentRowList = function a({ Component, list }) {
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
