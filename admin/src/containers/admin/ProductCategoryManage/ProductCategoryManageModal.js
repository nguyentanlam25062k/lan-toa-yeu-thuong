import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { CREATE } from "../../../constants/index.constant";
import "./ProductCategoryManageModal.scss";
import { TreeSelect } from "antd";

const { TreeNode } = TreeSelect;

function ProductCategoryManageModal(props) {
  const {
    modal,
    checkedKeyList,
    selectedList,
    categoryProductTree,
    errorInput,
    onCancel,
    onInputChange,
    onSelectChange,
    onSubmitForm
  } = props;

  const { isOpen, action } = modal;

  const renderTreeNode = (categoryProductTree, parentId = null) => {
    const nodes = categoryProductTree.filter((item) => item.parentId === parentId);
    return (
      <>
        {nodes.map((node) => (
          <TreeNode value={node.id} title={node.name} key={node.id}>
            {node.children && renderTreeNode(node.children, node.id)}
          </TreeNode>
        ))}
      </>
    );
  };

  return (
    <Modal
      className='product-category-manage-modal'
      title={action === CREATE ? "Thêm mới danh mục sản phẩm" : "Sửa thông tin danh mục sản phẩm"}
      footer={null}
      width={900}
      onCancel={onCancel}
      visible={isOpen}
      // style={{ height: 'calc(100vh - 100px)' }}
      // bodyStyle={{ overflowY: 'scroll' }}
    >
      <form className='form' onSubmit={(e) => onSubmitForm(e)}>
        <div className='form-body'>
          {checkedKeyList?.length > 0 ? (
            <>
              <div className='form-body-left'>
                {checkedKeyList?.length > 0 &&
                  checkedKeyList.map((item, index) => (
                    <div className='form-group' key={index}>
                      <label htmlFor=''>Tên danh mục</label>
                      <input
                        type='text'
                        placeholder='Tên danh mục'
                        name='name'
                        value={item.name}
                        onChange={(e) => onInputChange(e.target.value, index, "name")}
                      />
                      {errorInput.msg.filter((item) => item.position === index) && (
                        <div className='error-message'>
                          {errorInput.msg.filter((item) => item.position === index).value}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
              <div className='form-body-right'>
                {selectedList?.length > 0 &&
                  selectedList.map((item, index) => (
                    <div className='form-group' key={index}>
                      <label htmlFor=''>Danh mục cha</label>
                      <TreeSelect
                        showSearch
                        style={{ width: "100%" }}
                        value={item.value}
                        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                        placeholder='Please select'
                        allowClear
                        treeDefaultExpandAll
                        onChange={(categoryProductId) => onSelectChange(categoryProductId, item.name)}
                      >
                        {renderTreeNode(categoryProductTree)}
                      </TreeSelect>
                    </div>
                  ))}
              </div>
            </>
          ) : (
            <div
              style={{
                textAlign: "center",
                margin: "100px auto",
                fontWeight: "500",
                fontSize: "20px",
                color: "rgba(0, 0, 0, .85)"
              }}
            >
              Vui lòng chọn danh mục để chỉnh sửa
            </div>
          )}
        </div>
        <div className='form-buttons'>
          <span
            style={{
              width: 120,
              display: "inline-block",
              backgroundColor: "#cccccc"
            }}
            onClick={() => {
              console.log("errorInput", errorInput);
            }}
          >
            check state
          </span>
          <button className='ant-btn cancel' onClick={onCancel}>
            <span>Hủy</span>
          </button>
          <button type='submit' className='ant-btn ant-btn-primary submit'>
            <span>Xác nhận</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}
export default ProductCategoryManageModal;
