/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Input,
  InputGroup,
  ButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Spinner,
} from 'reactstrap';

const SearchBar = function b({ types }) {
  const [input, setInput] = useState({ param: '', label: '', value: '' });
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const toggle = () => { setIsOpenDropdown((currState) => (!currState)); };
  useEffect(async () => {
    const timeout = setTimeout(async () => {
      if (input.value !== '') {
        setLoadingSearch(true);
        // const data = await searchFunction({ ...searchParams, input: value });
        // if (data.status === 200) {
        //   setActualState(data.data);
        // }
        setLoadingSearch(false);
      }
    }, 600);

    return () => {
      clearTimeout(timeout);
    };
  }, [input]);
  return (
    <InputGroup>
      <ButtonDropdown size="sm" toggle={toggle} isOpen={isOpenDropdown}>
        <DropdownToggle style={{ backgroundColor: '#629E65' }} caret>{input.label === '' ? 'Selecione' : input.label}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Pesquisar por:</DropdownItem>
          {types.map((item) => (
            <DropdownItem
              key={item.id}
              onClick={() => setInput({
                value: '',
                label: item.label,
                param: item.param,
              })}
            >
              {item.label}
            </DropdownItem>
          ))}
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
      <div className="align-self-center">
        {loadingSearch ? <Spinner size="sm" /> : <div />}
      </div>
    </InputGroup>
  );
};

export default SearchBar;
