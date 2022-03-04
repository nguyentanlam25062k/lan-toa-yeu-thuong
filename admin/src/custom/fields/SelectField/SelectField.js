import {useController } from "react-hook-form";
import PropTypes from "prop-types";
import React from "react";
import Select from "react-select";

SelectField.propTypes = {
  control: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.array,
  defaultValue: PropTypes.number,
}

SelectField.defaultProps = {
  label: '',
  placeholder: '',
  disabled: false,
  options: []
}

function SelectField (props) {
  const {control, errors, options, label, name, placeholder, disabled, errorInvisible} = props;
  const {field} = useController({control, name});
  const isError = errors[name] || errorInvisible;
  return (
    <div className="form-group">
      {label && <label htmlFor={name} >{label}</label>}
      <Select
        {...field}
        className="form-group-select"
        classNamePrefix="form-group-select"
        inputRef={field.ref}
        id={name}
        placeholder={placeholder}
        disabled={disabled}
        options={options}
        value={options.find(c => c.value === field.value)}
        onChange={option => {
          return field.onChange({
            target: {
              value: option.value,
              name: name
            }
          })
        }}
      />
      <div className="error-message" style={{opacity: 0}}>{errors[isError]?.message}</div>

    </div>
  )
}

export default SelectField;