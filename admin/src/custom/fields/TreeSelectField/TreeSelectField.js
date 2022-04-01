import _ from "lodash";
import React from "react";
import { useController } from "react-hook-form";
import { TreeSelect } from "antd";
const { TreeNode } = TreeSelect;

function TreeSelectField(props) {
  const { control, errors, label, name, placeholder, disabled, type } = props;
  const { field } = useController({ control, name });
  const isValidField = typeof field.value !== "object";
  return (
    <div className={`form-group ${errors[name] ? "error" : ""}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <TreeSelect
        showSearch
        style={{ width: "100%" }}
        value={field.value}
        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
        placeholder={placeholder}
        allowClear
        treeDefaultExpandAll
        onChange={field.onChange}
      >
        <TreeNode value='parent 1' title='parent 1'>
          <TreeNode value='parent 1-0' title='parent 1-0'>
            <TreeNode value='leaf1' title='leaf1' />
            <TreeNode value='leaf2' title='leaf2' />
          </TreeNode>
          <TreeNode value='parent 1-1' title='parent 1-1'>
            <TreeNode value='leaf3' title={<b style={{ color: "#08c" }}>leaf3</b>} />
          </TreeNode>
        </TreeNode>
      </TreeSelect>
      {/* <input
        name={field.name}
        value={isValidField ? field.value : undefined}
        onChange={field.onChange}
        onBlur={field.onBlur}
        id={field.name}
        className='ant-input'
        placeholder={placeholder}
        disabled={disabled}
        type={type}
      /> */}
      {!_.isEmpty(errors[name]) && <div className='error-message'>{errors[name]?.message}</div>}
    </div>
  );
}

export default TreeSelectField;
