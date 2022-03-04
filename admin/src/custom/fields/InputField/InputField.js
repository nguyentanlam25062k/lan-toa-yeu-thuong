import {Form, Input, Select} from "antd";
import {useController} from "react-hook-form";
// import {FormGroup, Input, Label} from "reactstrap";
import PropTypes from "prop-types";
import React from "react";
import _ from "lodash";

InputField.propTypes = {
  control: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
}

InputField.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  disabled: false
}

function InputField (props) {
  const {control, errors, label, name, placeholder, disabled, type} = props;
  const {field} = useController({control, name});

  return (
    <div className={`form-group ${errors[name] ? 'error' : ''}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        {...field}
        className="ant-input"
        id={name}
        placeholder={placeholder}
        disabled={disabled}
        type={type}
      />
      {!_.isEmpty(errors[name]) &&
        <div className="error-message">{errors[name]?.message}</div>
      }
    </div>
  )
}

export default InputField;