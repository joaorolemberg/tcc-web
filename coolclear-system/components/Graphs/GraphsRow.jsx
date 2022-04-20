/* eslint-disable no-unused-vars */
import React from 'react';
import { Row, Col } from 'reactstrap';
import useGraphData from '../../hooks/useGraphData';
import ActivityGraph from './ActivityGraph';

// eslint-disable-next-line react/prop-types
function GraphsRow({ allPatients }) {
  const {
    graph1,
    graph2,
    graph3,
    graph1AllPatients,
    graph2AllPatients,
    graph3AllPatients,
    success,
  } = useGraphData();
  if (!success) {
    return (<Row className="mt-3 text-center"> Não foi possível buscar dados, tente novamente</Row>);
  }
  if (!allPatients) {
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
    return (<Row className="mt-3 text-center"><h3>Não há envios desse paciente para essa atividade</h3></Row>);
  }
  if (graph1AllPatients.enabled) {
    if (graph2AllPatients.enabled) {
      if (graph3AllPatients.enabled) {
        return (
          <Row className="mt-3">
            <Col xl={4}>
              <ActivityGraph
                data={graph1AllPatients.data}
                options={graph1AllPatients.options}
                chartType={graph1AllPatients.chartType}
              />
            </Col>
            <Col xl={4}>
              <ActivityGraph
                data={graph2AllPatients.data}
                options={graph2AllPatients.options}
                chartType={graph2AllPatients.chartType}
              />
            </Col>
            <Col xl={4}>
              <ActivityGraph
                data={graph3AllPatients.data}
                options={graph3AllPatients.options}
                chartType={graph3AllPatients.chartType}
              />
            </Col>
          </Row>
        );
      }
      return (
        <Row className="mt-3">
          <Col xl={6}>
            <ActivityGraph
              data={graph1AllPatients.data}
              options={graph1AllPatients.options}
              chartType={graph1AllPatients.chartType}
            />
          </Col>
          <Col xl={6}>
            <ActivityGraph
              data={graph2AllPatients.data}
              options={graph2AllPatients.options}
              chartType={graph2AllPatients.chartType}
            />
          </Col>
        </Row>
      );
    }
    if (graph3AllPatients.enabled) {
      return (
        <Row className="mt-3">
          <Col xl={6}>
            <ActivityGraph
              data={graph1AllPatients.data}
              options={graph1AllPatients.options}
              chartType={graph1AllPatients.chartType}
            />
          </Col>
          <Col xl={6}>
            <ActivityGraph
              data={graph3AllPatients.data}
              options={graph3AllPatients.options}
              chartType={graph3AllPatients.chartType}
            />
          </Col>
        </Row>
      );
    }
    return (
      <Row className="mt-3">
        <Col xl={12}>
          <ActivityGraph
            data={graph1AllPatients.data}
            options={graph1AllPatients.options}
            chartType={graph1AllPatients.chartType}
          />
        </Col>
      </Row>
    );
  }
  if (graph2AllPatients.enabled) {
    if (graph3AllPatients.enabled) {
      return (
        <Row className="mt-3">
          <Col xl={6}>
            <ActivityGraph
              data={graph2AllPatients.data}
              options={graph2AllPatients.options}
              chartType={graph2AllPatients.chartType}
            />
          </Col>
          <Col xl={6}>
            <ActivityGraph
              data={graph3AllPatients.data}
              options={graph3AllPatients.options}
              chartType={graph3AllPatients.chartType}
            />
          </Col>
        </Row>
      );
    }
    return (
      <Row className="mt-3">
        <Col xl={12}>
          <ActivityGraph
            data={graph2AllPatients.data}
            options={graph2AllPatients.options}
            chartType={graph2AllPatients.chartType}
          />
        </Col>
      </Row>
    );
  }
  if (graph3AllPatients.enabled) {
    return (
      <Row className="mt-3">
        <Col xl={12}>
          <ActivityGraph
            data={graph3AllPatients.data}
            options={graph3AllPatients.options}
            chartType={graph3AllPatients.chartType}
          />
        </Col>
      </Row>
    );
  }
  return (<Row className="mt-3 text-center"><h3>Não há envios de nenhum paciente para essa atividade</h3></Row>);
}

export default GraphsRow;
