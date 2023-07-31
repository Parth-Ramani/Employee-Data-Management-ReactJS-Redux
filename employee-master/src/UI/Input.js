import React from 'react';

const Input = (props) => {
  return <>

        <input
          id="fname"
          type={props.type ? props.type : "text"}
          onChange={props.onChange}
          value={props.value}
          onBlur={props.onBlur}
          placeholder={props.placeholder}
        />
  </>;
};

export default Input;
