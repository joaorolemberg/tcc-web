/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Input, Label } from 'reactstrap';

const DatalistInput = function a({
  placeholder, id, items, setSelectedState, disabled, label, size, idNotInt,
}) {
  const [input, setInput] = useState('');

  useEffect(() => {
    if (disabled) {
      setSelectedState({});
      setInput('');
    }
  }, [disabled]);
  function onInput(e) {
    setInput(e.target.value);
    let found = false;
    const val = e.target.value;
    const opts = document.getElementById(`datalist${id}`).childNodes;
    for (let i = 0; i < opts.length; i += 1) {
      if (opts[i].value === val) {
        found = true;
        let idKey = 0;
        if (!idNotInt) {
          idKey = parseInt(opts[i].attributes.idkey.value, 10);
        } else {
          idKey = opts[i].attributes.idkey.value;
        }
        setSelectedState({ key: idKey, label: `${opts[i].label}` });
        break;
      }
    }
    if (!found) {
      setSelectedState({});
    }
  }
  return (
    <div className="mb-3">
      <Label for={id}>{label}</Label>
      <Input
        list={`datalist${id}`}
        placeholder={placeholder}
        id={id}
        onInput={(e) => onInput(e)}
        value={input}
        disabled={disabled}
        bsSize={size}
      />
      <datalist id={`datalist${id}`}>
        {items.map((item) => (
          <option
            key={item.key}
            idkey={item.key}
            label={item.label}
            value={item.label}
          />
        ))}
      </datalist>
    </div>
  );
};

export default DatalistInput;
