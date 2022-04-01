import {useController } from "react-hook-form";
import PropTypes from "prop-types";
import React from "react";
import Select from "react-select";
import addressAction from "../../../redux/actions/address.action";
import {useDispatch} from "react-redux";
import _ from "lodash";
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
  const {control, errors, getValues, options, label, name, placeholder, disabled, invisibleError, onChangeAddress} = props;
  const {field} = useController({control, name});
  // const nameError = errors[name] ?  name : invisibleError;
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
          field.onChange({
            target: {
              value: option.value,
              name: name
            }
          })
          onChangeAddress(name);
        }}
      />
      {
        errors[name] ? <div className="error-message" style={{opacity: 1}}>{errors[name]?.message}</div>
          : <div className="error-message" style={{opacity: 0}}>{errors[invisibleError]?.message}</div>
      }

    </div>
  )
}

export default SelectField;