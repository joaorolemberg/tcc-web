import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Input,
  Row,
  Button,
  InputGroup,
  ButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from 'reactstrap';
import Main from '../../components/layout/Main';

const Responsavel = function b() {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [input, setInput] = useState({ param: '', value: '' });

  const toggle = () => setIsOpenDropdown((currState) => !currState);

  return (
    <div style={{ marginTop: '50px' }}>
      <Row>
        <Col>
          <Card body>
            <div
              style={{
                borderStyle: 'solid',
                borderColor: 'lightgrey',
                borderWidth: '0px 0px 2px 0px',
                paddingTop: '10px',
                paddingBottom: '10px',
              }}
            >
              <Row>
                <Col xl="4" className="align-self-center">
                  <CardTitle style={{ fontSize: '24px' }}>
                    Responsáveis
                  </CardTitle>
                </Col>
                <Col xl="7" className="align-self-center">
                  <InputGroup>
                    <ButtonDropdown size="sm" toggle={toggle} isOpen={isOpenDropdown}>
                      <DropdownToggle style={{ backgroundColor: '#629E65' }} caret>{input.param === '' ? 'Selecione' : input.param}</DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Pesquisar por:</DropdownItem>
                        <DropdownItem onClick={() => setInput((currState) => ({ ...currState, param: 'Nome' }))}>Nome</DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown>
                    <Input
                      bsSize="sm"
                      onChange={(e) => setInput((currState) => ({
                        ...currState,
                        value: e.target.value,
                      }))}
                      value={input.value}
                      style={{ maxWidth: '400px', backgroundColor: '#E5EFE5' }}

                    />
                  </InputGroup>
                </Col>
                <Col xl="1" className="text-end align-self-center">
                  <Button
                    style={{ backgroundColor: '#2E7D32', borderRadius: '5px', marginRight:'5px' }}
                    size="sm"
                    className="text-center"
                  >
                    <span>
                      <i className="fa fa-plus text-white" />
                    </span>
                  </Button>
                </Col>
              </Row>
            </div>

            <CardBody>table</CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

Responsavel.layout = Main;
export default Responsavel;
