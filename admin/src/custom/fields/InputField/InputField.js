import _ from "lodash";
import React from "react";
import { useController } from "react-hook-form";

function InputField(props) {
  const { control, errors, label, name, placeholder, disabled, type } = props;
  const { field } = useController({ control, name });
  const isValidField = typeof field.value !== "object";

  return (
    <div className={`form-group ${errors[name] ? "error" : ""}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        name={field.name}
        value={isValidField ? field.value : undefined}
        onChange={field.onChange}
        onBlur={field.onBlur}
        id={field.name}
        className='ant-input'
        placeholder={placeholder}
        disabled={disabled}
        type={type}
      />
      {!_.isEmpty(errors[name]) && <div className='error-message'>{errors[name]?.message}</div>}
    </div>
  );
}

export default InputField;
