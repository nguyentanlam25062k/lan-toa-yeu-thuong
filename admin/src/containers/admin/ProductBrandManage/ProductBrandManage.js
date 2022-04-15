import "./ProductBrandManage.scss";
import Content from "../Layout/Content";
import ProductBrandTable from "./ProductBrandTable";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { productBrandApi, uploadApi } from "../../../api/index.api";
import { UPDATE, CREATE } from "../../../constants/index.constant";
import ProductBrandModal from "./ProductBrandModal";
import { toast } from "react-toastify";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { stringify } from "../../../utils";
import { useEffectOnce, usePrevious, useUpdateEffect } from "react-use";
import _ from "lodash";
import ProductBrandFeature from "./ProductBrandFeature";

const { confirm } = Modal;

const initModal = {
    isOpen: false,
    action: UPDATE
};

const initLoadImage = {
    isUpload: false,
    isLoading: false
};

const initBrand = {
    id: null,
    name: "",
    imageUrl: "",
    imageId: "",
    active: 1,
    userId: 11
};

const initQuery = {
    search: "",
    sort: "createdAt",
    page: 1,
    limit: 5,
    id: {
        gt: null,
        lt: null
    },
    where: {
        active: "ALL"
    }
};

const initBrandList = {
    rows: [],
    totalRow: null
};

function ProductBrandManage() {
    const [modal, setModal] = useState(initModal);
    const [loadImage, setLoadImage] = useState(initLoadImage);
    const [brand, setBrand] = useState(initBrand);
    const [brandList, setBrandList] = useState(initBrandList);
    const [query, setQuery] = useState(initQuery);
    const queryString = stringify(query);

    const prev = usePrevious({
        queryString: queryString
    });

    const debounceQuery = useCallback(
        _.debounce(async () => {
            await getProductBrand(queryString);
        }, 300)
    );

    useEffectOnce(() => {
        const init = async () => {
            await getProductBrand(queryString);
        };
        init();
    }, []);

    useUpdateEffect(() => {
        const init = async () => {
            if (prev.queryString !== queryString) {
                await debounceQuery();
            }
        };
        init();
        return () => {
            debounceQuery.cancel();
        };
    }, [queryString, debounceQuery]);

    const getProductBrand = async (query) => {
        try {
            const res = await productBrandApi.getProductBrand(query);
            if (res?.code === 0) {
                setBrandList({
                    rows: res.body.rows,
                    totalRow: res.body.count
                });
            }
        } catch (e) {
            toast.error(e.message);
        }
    };

    const handleUploadImage = async (e) => {
        e.preventDefault();
        try {
            const file = e.target.files[0];

            if (!file) {
                return toast.error("File không tồn tại !");
            }

            if (file.size > 1024 * 1024) {
                return toast.error("Dung lượng file chỉ cho phép tối đa 1MB !");
            }

            if (!["image/jpeg", "image/png"].includes(file.type)) {
                return toast.error(`Định dạng file không hợp lệ !`);
            }

            let formData = new FormData();
            formData.append("image", file);

            setLoadImage({ isUpload: true, isLoading: true });
            const res = await uploadApi.uploadImage(formData);
            const { msg } = res;

            if (res?.code === 0) {
                const { imageId, imageUrl } = res.body[0];
                setBrand({ ...brand, imageId, imageUrl });
                setLoadImage({ isUpload: true, isLoading: false });
                toast.success(msg);
            }
        } catch (e) {
            setLoadImage(initLoadImage);
            toast.error(e.message);
        }
    };

    const handleDestroyImage = async () => {
        try {
            setLoadImage({ isLoading: true, isUpload: true });
            const res = await uploadApi.deleteImage(brand.imageId);
            const { msg } = res;
            setLoadImage(initLoadImage);
            if (res?.code === 0) {
                setBrand({ ...brand, imageId: "", imageUrl: "" });
                toast.success(msg);
            }
        } catch (e) {
            setLoadImage(initLoadImage);
            toast.error(e.message);
        }
    };

    const handleOpenModal = async (action, record) => {
        setModal({ isOpen: true, action: action });
        if (action === UPDATE) {
            const { id, name: brandName, imageUrl, imageId, active } = record;
            setBrand({ ...brand, id, name: brandName, imageUrl, imageId, active });
            setLoadImage({ ...loadImage, isUpload: true });
        }
    };

    const handleCancel = (e) => {
        if (e) {
            e.preventDefault();
        }
        setModal(initModal);
        setBrand(initBrand);
        setLoadImage(initLoadImage);
    };

    const handleInputChange = (value, field) => {
        console.log({ value, field });
        setBrand({ ...brand, [field]: value });
    };

    const handlePageChange = (page, pageSize) => {
        console.log({ page, pageSize });
        setQuery({
            ...query,
            page: page,
            limit: pageSize
        });
    };

    const handleSortChange = (value) => {
        setQuery({ ...query, sort: value });
    };

    const handleSelectChange = (value, name) => {
        setQuery({
            ...query,
            where: {
                ...query.where,
                [name]: value
            }
        });
    };

    const handleUnSelectChange = () => {
        setQuery({ ...initQuery });
    };

    const handleSearchChange = (value) => {
        setQuery({
            ...query,
            search: value
        });
    };

    const handUpdateActive = async (value, id) => {
        const active = value === 1 ? 0 : 1;
        try {
            const res = await productBrandApi.updateActiveProductBrand({ active, id });
            if (res?.code === 0) {
                toast.success(res.msg);
            }
            await getProductBrand();
        } catch (e) {
            toast.error(e.message);
        }
    };

    const handleSubmitForm = async (e) => {
        if (e) {
            e.preventDefault();
        }
        try {
            let res;

            if (modal.action === CREATE) {
                delete brand.id;
                delete brand.userId;
                res = await productBrandApi.createProductBrand(brand);
            } else {
                res = await productBrandApi.updateProductBrand(brand);
            }
            await getProductBrand();
            toast.success(res.msg);
            handleCancel();
        } catch (e) {
            toast.error(e.message);
        }
    };

    const handleDeleteBrand = async (id) => {
        confirm({
            title: "Bạn có chắc chắn xóa thương hiệu này?",
            icon: <ExclamationCircleOutlined />,
            content: "Bạn sẽ không khôi phục lại được thương hiệu này !",
            async onOk() {
                try {
                    const { msg } = await productBrandApi.deleteProductBrand(id);
                    await getProductBrand();
                    toast.success(msg);
                } catch (e) {
                    toast.error(e.message);
                }
            },
            onCancel() {
                console.log("Cancel");
            }
        });
    };

    return (
        <Content>
            <ProductBrandFeature
                query={query}
                onSearchChange={handleSearchChange}
                onSelectChange={handleSelectChange}
                onUnSelectChange={handleUnSelectChange}
            />
            <ProductBrandTable
                query={query}
                brandList={brandList}
                onOpenModal={handleOpenModal}
                onDeleteBrand={handleDeleteBrand}
                onUpdateActive={handUpdateActive}
                onPageChange={handlePageChange}
                onSortChange={handleSortChange}
            />
            <ProductBrandModal
                modal={modal}
                brand={brand}
                loadImage={loadImage}
                onCancel={handleCancel}
                onUploadImage={handleUploadImage}
                onDestroyImage={handleDestroyImage}
                onInputChange={handleInputChange}
                onSubmitForm={handleSubmitForm}
            />
        </Content>
    );
}

export default ProductBrandManage;
