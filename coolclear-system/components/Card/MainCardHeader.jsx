/* eslint-disable react/prop-types */
import React from 'react';
import {
  CardTitle,
  Col,
  Row,
  Button,
} from 'reactstrap';
import DropdownFilter from '../DropdownFilter/DropdownFilter';
import SearchBar from '../Search/SearchBar';

const MainCardHeader = function c({
  title, add, search, filter,
}) {
  if (add && search && filter) {
    return (
      <Row>
        <Col xl="4" lg={4} md={4} sm={12} xs={12} className="align-self-center">
          <CardTitle style={{ fontSize: '24px' }}>
            {title}
          </CardTitle>
        </Col>
        <Col xl="5" lg={5} md={5} sm={8} xs={8} className="align-self-center">
          <SearchBar types={search.types} />
        </Col>
        <Col xl="2" lg={2} md={2} sm={2} xs={2} className="align-self-center">
          <DropdownFilter filter={filter} />
        </Col>
        <Col xl="1" lg={1} md={1} sm={2} xs={2} className="text-end align-self-center">
          <Button
            style={{ backgroundColor: '#2E7D32', borderRadius: '5px', marginRight: '5px' }}
            size="sm"
            className="text-center"
            onClick={() => add()}
          >
            <span>
              <i className="fa fa-plus text-white" />
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
  if (add) {
    return (
      <Row>
        <Col xl={11} lg={11} md={11} sm={10} xs={10} className="align-self-center">
          <CardTitle style={{ fontSize: '24px' }}>
            {title}
          </CardTitle>
        </Col>
        <Col xl={1} lg={1} md={1} sm={2} xs={2} className="text-end align-self-center">
          <Button
            style={{ backgroundColor: '#2E7D32', borderRadius: '5px', marginRight: '5px' }}
            size="sm"
            className="text-center"
            onClick={() => add()}
          >
            <span>
              <i className="fa fa-plus text-white" />
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
  if (search) {
    return (
      <Row>
        <Col xl="4" lg={4} md={4} sm={5} xs={12} className="align-self-center">
          <CardTitle style={{ fontSize: '24px' }}>
            {title}
          </CardTitle>
        </Col>
        <Col xl="7" lg={6} md={6} sm={7} xs={12} className="align-self-center">
          <SearchBar />
        </Col>
      </Row>
    );
  }

  return (
    <Row>
      <Col className="align-self-center">
        <CardTitle style={{ fontSize: '24px' }}>
          {title}
        </CardTitle>
      </Col>
    </Row>
  );
};

export default MainCardHeader;
