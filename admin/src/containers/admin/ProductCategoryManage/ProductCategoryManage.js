import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Tree } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { productCategoryApi } from "../../../api/product-category.api.js";
import { CREATE, UPDATE } from "../../../constants/index.constant.js";
import { productCategorySchema } from "../../../schema/index.schema";
import Content from "../Layout/Content.js";
import "./ProductCategoryManage.scss";
import ProductCategoryManageModal from "./ProductCategoryManageModal.js";

function ProductCategoryManage(props) {
  console.log("re-render");
  const [modal, setModal] = useState({ isOpen: true, action: CREATE });

  const [checkedKeys, setCheckedKeys] = useState([]);
  const [checkedKeyList, setCheckedKeyList] = useState([""]);
  const [selectedList, setSelectedList] = useState([""]);
  const [categoryProductList, setCategoryProductList] = useState([]);

  const [isButtonSubmitClick, setIsButtonSubmitClick] = useState(false);

  const [errorInput, setErrorInput] = useState({ isError: false, msg: [] });

  const isActionCreate = modal.action === CREATE;

  useEffect(() => {
    const getCategory = async () => {
      try {
        const { body } = await productCategoryApi.getProductCategory();
        if (body?.length > 0) {
          setCategoryProductList(body);
        }
      } catch (e) {
        toast.error(e.message);
      }
    };
    getCategory();
  }, []);

  const createCategoryTree = (categories, parentId = null) => {
    const categoryTree = [];
    const category = categories.filter((cat) => cat.parentId === parentId);

    for (let cate of category) {
      categoryTree.push({
        ...cate,
        title: cate.name,
        key: cate.id,
        children: createCategoryTree(categories, cate.id)
      });
    }

    return categoryTree;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category.id,
        name: category.name,
        parentId: category.parentId
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const onCheck = (checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue);
    handleCheckedKeyList(checkedKeysValue);
  };

  const handleCheckedKeyList = (checkedKeysValue) => {
    const checkedArr = [];
    checkedKeysValue?.length > 0 &&
      checkedKeysValue.forEach((categoryId) => {
        const category = categoryProductList.find((item) => item.id === categoryId);
        checkedArr.push(category);
      });
    const selectedArr = checkedArr.map((item) => ({ name: item.name, value: item.id }));

    setCheckedKeyList(checkedArr);
    setSelectedList(selectedArr);
  };

  const handleInputChange = (value, index, key) => {
    const checkedKeyListChange = checkedKeyList.map((item, _index) =>
      _index === index ? { ...item, [key]: value } : item
    );

    const { isValid, errorMsgList } = handleErrorForm(value, index);
    console.log({ isValid, errorMsgList });
    setErrorInput({ isError: isValid, msg: errorMsgList });
    setCheckedKeyList(checkedKeyListChange);
  };

  const handleSelectChange = (value, name) => {
    const selectedListChange = selectedList.map((item) => (item.name === name ? { ...item, value: value } : item));
    setSelectedList(selectedListChange);
  };

  const handleOpenModal = async (action) => {
    if (action === CREATE) {
      setModal({ isOpen: true, action: CREATE });
      setCheckedKeyList([""]);
      setSelectedList([""]);
    } else {
      setModal({ isOpen: true, action: UPDATE });
    }
  };

  const handleCancel = () => {
    setModal({ ...modal, isOpen: false });
    setCheckedKeys([]);
    setCheckedKeyList([]);
    setSelectedList([]);
  };

  const handleErrorForm = (value, position) => {
    let errorMsgList = [...errorInput.msg];
    let result;
    let isValid = true;

    if (!value && !position) {
      for (let i = 0; i < checkedKeyList.length; i++) {
        if (!checkedKeyList[i].name) {
          if (!errorMsgList.some((item) => item.position === i)) {
            errorMsgList.push({ position: position, value: "Vui lòng điền tên danh mục" });
          }
          isValid = false;
        } else {
          errorMsgList = errorMsgList.filter((item) => item.position !== position);
        }
      }
    } else {
      if (value === "") {
        if (!errorMsgList.some((item) => item.position === position)) {
          errorMsgList.push({ position: position, value: "Vui lòng điền tên danh mục" });
        }
      } else {
        errorMsgList = errorMsgList.filter((item) => item.position !== position);
      }

      if (errorMsgList.length > 0) {
        isValid = false;
      }
    }

    if (isValid) {
      result = {
        isValid: true,
        errorMsgList: []
      };
    } else {
      result = {
        isValid: false,
        errorMsgList: errorMsgList
      };
    }
    return result;
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const { isValid, errorMsgList } = handleErrorForm();
    setErrorInput({ isError: isValid, msg: errorMsgList });
  };

  const categoryProductTree = createCategoryTree(categoryProductList);

  return (
    <Content>
      <button onClick={() => console.log("selectedList", selectedList)}>log State</button>
      <div className='product-category-manage'>
        <div className='tree'>
          <Tree
            checkable
            checkedKeys={checkedKeys}
            treeData={createCategoryTree(categoryProductList)}
            onCheck={onCheck}
          />
        </div>
        <div className='btn'>
          <button className='ant-btn ant-btn-primary' onClick={() => handleOpenModal(CREATE)}>
            Thêm
          </button>
          <button className='ant-btn button edit' onClick={() => handleOpenModal(UPDATE)}>
            Sửa
          </button>
          <button className='ant-btn button delete'>Xóa</button>
        </div>
        <div className='modal'>
          <ProductCategoryManageModal
            modal={modal}
            checkedKeyList={checkedKeyList}
            selectedList={selectedList}
            categoryProductTree={categoryProductTree}
            errorInput={errorInput}
            onCancel={handleCancel}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
            onSubmitForm={handleSubmitForm}
          />
        </div>
      </div>
    </Content>
  );
}

export default ProductCategoryManage;
