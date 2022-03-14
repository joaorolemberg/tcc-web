import React, { useState } from 'react';
import {
  Input,
  InputGroup,
  ButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from 'reactstrap';

const SearchBar = function b() {
  const [input, setInput] = useState({ param: '', value: '' });
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const toggle = () => { setIsOpenDropdown((currState) => (!currState)); };
  return (
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
  );
};

export default SearchBar;
