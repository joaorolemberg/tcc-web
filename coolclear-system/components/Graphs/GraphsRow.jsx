/* eslint-disable no-unused-vars */
import React from 'react';
import { Row, Col } from 'reactstrap';
import useGraphData from '../../hooks/useGraphData';
import ActivityGraph from './ActivityGraph';

function GraphsRow() {
  const {
    graph1,
    graph2,
    graph3,
    handleGraph,
    enabled,
    setEnabled,
    loadingGraphs,
  } = useGraphData();
  if (graph1.enabled) {
    if (graph2.enabled) {
      if (graph3.enabled) {
        return (
          <Row className="mt-3">
            <Col xl={4}>
              <ActivityGraph
                data={graph1.data}
                options={graph1.options}
                chartType={graph1.chartType}
              />
            </Col>
            <Col xl={4}>
              <ActivityGraph
                data={graph2.data}
                options={graph2.options}
                chartType={graph2.chartType}
              />
            </Col>
            <Col xl={4}>
              <ActivityGraph
                data={graph3.data}
                options={graph3.options}
                chartType={graph3.chartType}
              />
            </Col>
          </Row>
        );
      }
      return (
        <Row className="mt-3">
          <Col xl={6}>
            <ActivityGraph
              data={graph1.data}
              options={graph1.options}
              chartType={graph1.chartType}
            />
          </Col>
          <Col xl={6}>
            <ActivityGraph
              data={graph2.data}
              options={graph2.options}
              chartType={graph2.chartType}
            />
          </Col>
        </Row>
      );
    }
    if (graph3.enabled) {
      return (
        <Row className="mt-3">
          <Col xl={6}>
            <ActivityGraph
              data={graph1.data}
              options={graph1.options}
              chartType={graph1.chartType}
            />
          </Col>
          <Col xl={6}>
            <ActivityGraph
              data={graph3.data}
              options={graph3.options}
              chartType={graph3.chartType}
            />
          </Col>
        </Row>
      );
    }
    return (
      <Row className="mt-3">
        <Col xl={12}>
          <ActivityGraph
            data={graph1.data}
            options={graph1.options}
            chartType={graph1.chartType}
          />
        </Col>
      </Row>
    );
  }
  if (graph2.enabled) {
    if (graph3.enabled) {
      return (
        <Row className="mt-3">
          <Col xl={6}>
            <ActivityGraph
              data={graph2.data}
              options={graph2.options}
              chartType={graph2.chartType}
            />
          </Col>
          <Col xl={6}>
            <ActivityGraph
              data={graph3.data}
              options={graph3.options}
              chartType={graph3.chartType}
            />
          </Col>
        </Row>
      );
    }
    return (
      <Row className="mt-3">
        <Col xl={12}>
          <ActivityGraph
            data={graph2.data}
            options={graph2.options}
            chartType={graph2.chartType}
          />
        </Col>
      </Row>
    );
  }
  if (graph3.enabled) {
    return (
      <Row className="mt-3">
        <Col xl={12}>
          <ActivityGraph
            data={graph3.data}
            options={graph3.options}
            chartType={graph3.chartType}
          />
        </Col>
      </Row>
    );
  }
  return <Row> Todos gráficos inativos</Row>;
}

export default GraphsRow;
