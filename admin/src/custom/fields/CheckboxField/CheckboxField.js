import {Form, Input, Select} from "antd";
import {useController} from "react-hook-form";
// import {FormGroup, Input, Label} from "reactstrap";
import PropTypes from "prop-types";
import React from "react";

CheckboxField.propTypes = {
  control: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
}

CheckboxField.defaultProps = {
  type: 'radio',
  label: '',
}

function CheckboxField (props) {
  const {control, errors, options, label, name, type} = props;
  const {field} = useController({control, name});
  return (
    <div className="form-group">
      {label && <label >{label}</label>}
      <div className="form-group-checkbox">
        {options?.length > 0 && options.map(option => (
          <div className="wrapper" key={option.value}>
            <label htmlFor={option.value}>{option.label}</label>
            <input
              {...field}
              type={type}
              id={option.value}
              value={option.value}
              checked={option.value === field.value}
            />
          </div>
        ))}
      </div>
      <div className="error-message">{errors[name]?.message}</div>
    </div>
  )
}

export default CheckboxField;