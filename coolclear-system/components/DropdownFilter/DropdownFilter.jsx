/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from 'reactstrap';

function DropdownFilter({ filter }) {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const toggle = () => { setIsOpenDropdown((currState) => (!currState)); };
  const [selectedFilter, setSelectedFilter] = useState({ param: '', label: '' });

  return (
    <div>
      <ButtonDropdown size="sm" toggle={toggle} isOpen={isOpenDropdown}>
        <DropdownToggle outline color="success" caret>{selectedFilter.label === '' ? 'Filtros:' : `Filtro: ${selectedFilter.label}`}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Filtrar por:</DropdownItem>
          {filter.map((item) => (
            <DropdownItem
              key={item.id}
              onClick={() => setSelectedFilter({
                label: item.label,
                param: item.param,
              })}
            >
              {item.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </ButtonDropdown>
    </div>
  );
}

export default DropdownFilter;
