import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Modal, Tree } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { productCategoryApi } from "../../../api/product-category.api.js";
import { CREATE, UPDATE } from "../../../constants/index.constant.js";
import { productCategorySchema } from "../../../schema/index.schema";
import Content from "../Layout/Content.js";
import "./ProductCategoryManage.scss";
import ProductCategoryManageModal from "./ProductCategoryManageModal.js";

import { WarningOutlined } from "@ant-design/icons";
// const initInputList {}= [{ name: "hom nay tao vui", parentId: 4 }];
const initInputList = [{ name: "", parentId: null }];

function ProductCategoryManage(props) {
    const [modal, setModal] = useState({ isOpen: false, action: CREATE });
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [checkedKeys, setCheckedKeys] = useState([]);
    const [inputList, setInputList] = useState([]);

    const [categoryProductList, setCategoryProductList] = useState([]);
    const [categoryProductTree, setCategoryProductTree] = useState(null);

    const isActionCreate = modal.action === CREATE;
    useEffect(() => {
        getCategory();
    }, []);

    useEffect(() => {
        const categoryProductTree = createCategoryTree(categoryProductList);
        setCategoryProductTree(categoryProductTree);
    }, [categoryProductList]);

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

    const createCategoryTree = (categories, parentId = null) => {
        const categoryTree = [];
        const category = categories.filter((cat) => cat.parentId === parentId);

        for (let cate of category) {
            categoryTree.push({
                ...cate,
                title: `${cate.name} - id(${cate.id})`,
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
        // const selectedArr = checkedArr.map((item) => ({ name: item.name, value: item.id }));

        setInputList(checkedArr);
    };

    const handleInputChange = (value, index, key) => {
        const checkedKeyListChange = inputList.map((item, _index) =>
            _index === index ? { ...item, [key]: value } : item
        );
        setInputList(checkedKeyListChange);
    };

    const handleOpenModal = async (action) => {
        if (action === CREATE) {
            setModal({ isOpen: true, action: CREATE });
            setInputList(initInputList);
        } else {
            setModal({ isOpen: true, action: UPDATE });
        }
    };

    const handleCancel = () => {
        setModal({ ...modal, isOpen: false });
        setCheckedKeys([]);
        setInputList(initInputList);
    };

    const handleModalDeleteOk = async () => {
        try {
            const idList = checkedKeys;
            const res = await productCategoryApi.deleteProductCategory(idList);
            await getCategory();
            toast.success(res.msg);
            setCheckedKeys([]);
            setInputList(initInputList);
            setIsModalVisible(false);
        } catch (e) {
            toast.error(e.message);
        }
    };

    const handleModalDeleteCancel = () => {
        setCheckedKeys([]);
        setInputList(initInputList);
        setIsModalVisible(false);
    };

    const handleDelete = () => {
        setIsModalVisible(true);
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        try {
            let res;
            const inputData = inputList.map((item) => ({
                id: item.id,
                name: item.name,
                parentId: item.parentId ? item.parentId : null
            }));

            if (isActionCreate) {
                res = await productCategoryApi.createProductCategory(inputData[0]);
            } else {
                res = await productCategoryApi.updateProductCategory(inputData);
            }
            await getCategory();
            toast.success(res.msg);
            handleCancel();
            setCheckedKeys([]);
            setInputList(initInputList);
        } catch (e) {
            toast.error(e.message);
        }
    };

    return (
        <Content>
            <button onClick={() => {}}>log State</button>
            <div className="product-category-manage">
                <div className="tree">
                    <Tree checkable checkedKeys={checkedKeys} treeData={categoryProductTree} onCheck={onCheck} />
                </div>

                <div className="btn">
                    <button className="ant-btn ant-btn-primary" onClick={() => handleOpenModal(CREATE)}>
                        Thêm
                    </button>
                    <button className="ant-btn button edit" onClick={() => handleOpenModal(UPDATE)}>
                        Sửa
                    </button>
                    <button className="ant-btn button delete" onClick={() => handleDelete()}>
                        Xóa
                    </button>
                </div>
                <div className="modal">
                    <ProductCategoryManageModal
                        modal={modal}
                        inputList={inputList}
                        categoryProductTree={categoryProductTree}
                        onCancel={handleCancel}
                        onInputChange={handleInputChange}
                        onSubmitForm={handleSubmitForm}
                    />
                </div>
                <div className="modal-delete">
                    <Modal
                        title={
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <WarningOutlined style={{ color: "red" }} />
                                <div style={{ marginLeft: "10px", fontSize: "16px" }}>
                                    Bạn có chắc chắc muốn xóa danh mục ?
                                </div>
                            </div>
                        }
                        visible={isModalVisible}
                        onOk={handleModalDeleteOk}
                        onCancel={handleModalDeleteCancel}
                    >
                        <div style={{ fontSize: "16px" }}>
                            Thao tác này có thế <strong>không khôi phục</strong> lại được !
                        </div>
                    </Modal>
                </div>
            </div>
        </Content>
    );
}

export default ProductCategoryManage;
