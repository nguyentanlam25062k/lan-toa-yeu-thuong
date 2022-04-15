import { ExclamationCircleOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Modal } from "antd";
import _ from "lodash";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffectOnce, usePrevious, useUpdateEffect } from "react-use";
import { addressApi, allCodeApi, uploadApi, userApi } from "../../../api/index.api";
import {
    CREATE,
    DEFAULT_DISTRICT_ID,
    DEFAULT_GENDER,
    DEFAULT_PROVINCE_ID,
    DEFAULT_ROLE,
    DEFAULT_WARD_ID,
    GENDER,
    ROLE,
    UPDATE
} from "../../../constants/index.constant";
import { userSchema } from "../../../schema/index.schema";
import addressService from "../../../services/address.service";
import { stringify } from "../../../utils";
import Content from "../Layout/Content";
import "./UserManage.scss";
import UserManageFeature from "./UserManageFeature";
import UserManageModal from "./UserManageModal";
import UserManageTable from "./UserManageTable";

const { confirm } = Modal;

const initUser = {
    // id: '',
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: DEFAULT_GENDER,
    phone: "",
    provinceId: DEFAULT_PROVINCE_ID,
    districtId: DEFAULT_DISTRICT_ID,
    wardId: DEFAULT_WARD_ID,
    role: DEFAULT_ROLE,
    imageId: "",
    imageUrl: ""
};

const initCreateUser = { ...initUser };
["id"].forEach((e) => delete initCreateUser[e]);

const initUpdateUser = { ...initUser };
["email", "password", "confirmPassword"].forEach((e) => delete initUpdateUser[e]);

const initUserList = {
    rows: [],
    totalRow: null
    // pagination: { page: 1, limit: 10, totalRow: null }
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
        role: "ALL",
        gender: "ALL"
    }
};

const initLoadImage = {
    isUpload: false,
    isLoading: false
};

function UserManage() {
    const [modal, setModal] = useState({ isOpen: false, action: UPDATE });
    const [query, setQuery] = useState({ ...initQuery });
    const [userList, setUserList] = useState({ ...initUserList });
    const [loadImage, setLoadImage] = useState({ ...initLoadImage });
    const [allCode, setAllCode] = useState({
        genderList: [],
        roleList: []
    });
    const [address, setAddress] = useState({
        provinceList: [],
        districtList: [],
        wardList: [],
        provinceId: 202,
        districtId: 3695,
        wardId: 90768,
        isSelectAddressChange: false
    });

    const isActionCreate = modal.action === CREATE;

    const {
        handleSubmit,
        control,
        setValue,
        watch,
        getValues,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: isActionCreate ? { ...initCreateUser } : { ...initUpdateUser },
        resolver: isActionCreate ? yupResolver(userSchema.createUser) : yupResolver(userSchema.updateUser)
    });

    const { provinceList, districtList, wardList, provinceId, districtId, wardId } = address;

    const { rows } = userList;
    const { page, limit } = query;

    const queryString = stringify(query);

    const prev = usePrevious({
        provinceList: provinceList,
        districtList: districtList,
        wardList: wardList,
        provinceId: provinceId,
        districtId: districtId,
        wardId: wardId,
        queryString: queryString
    });

    useEffectOnce(() => {
        const getAllAddress = async () => {
            try {
                const [provinceArr, districtArr, wardArr, genderArr, roleArr, userArr] = await Promise.all([
                    addressApi.getProvince(),
                    addressApi.getDistrict(provinceId),
                    addressApi.getWard(districtId),
                    allCodeApi.getAllCode(GENDER),
                    allCodeApi.getAllCode(ROLE),
                    userApi.getUser(queryString)
                ]);

                setAddress({
                    ...address,
                    provinceList: provinceArr.data,
                    districtList: districtArr.data,
                    wardList: handleResponseWardData(wardArr.data)
                });

                setAllCode({
                    genderList: genderArr.body,
                    roleList: roleArr.body
                });

                setUserList({
                    rows: userArr.body.rows,
                    totalRow: userArr.body.count
                    // pagination: {
                    //   ...pagination,
                    //   totalRow: userArr.body.count
                    // }
                });
            } catch (e) {
                toast.error(e.message);
            }
        };
        getAllAddress();
    }, []);

    const debounceQuery = useCallback(
        _.debounce(async () => {
            await getUserList(queryString);
        }, 300)
    );

    useUpdateEffect(() => {
        const init = async () => {
            if (address.isSelectAddressChange) {
                if (prev.provinceId !== provinceId) {
                    const districtList = await addressService.getDistrict(provinceId);
                    setAddress({ ...address, isSelectAddressChange: true, districtList: districtList });
                }
                if (prev.districtId !== districtId) {
                    const wardList = await addressService.getWard(districtId);
                    setAddress({ ...address, isSelectAddressChange: true, wardList: wardList });
                }

                if (!_.isEqual(prev.districtList, districtList)) {
                    const { DistrictID } = districtList[0];
                    setAddress({ ...address, isSelectAddressChange: true, districtId: DistrictID });
                    setValue("districtId", DistrictID);
                }

                if (!_.isEqual(prev.wardList, wardList)) {
                    let WardCode;
                    if (wardList?.length > 0) {
                        WardCode = wardList[0].WardCode;
                        console.log("WardCode", WardCode);
                        setAddress({ ...address, isSelectAddressChange: true, wardId: WardCode });
                        setValue("wardId", WardCode);
                    } else {
                        WardCode = null;
                        setAddress({ ...address, wardId: WardCode });
                        setValue("wardId", WardCode);
                    }
                }
            }
            if (!_.isEqual(prev.queryString, queryString)) {
                // await getUserList(queryString);
                await debounceQuery();
            }
        };
        init();
        return () => {
            debounceQuery.cancel();
        };
    }, [provinceId, districtId, districtList, wardList, queryString, debounceQuery]);

    const { imageId } = getValues();

    const getUserList = async (queryString) => {
        try {
            const {
                body: { rows, count }
            } = await userApi.getUser(queryString);
            setUserList({
                rows,
                totalRow: count
                // pagination: { ...pagination, totalRow: count }
            });
        } catch (e) {
            toast.error(e.message);
        }
    };

    const handlePageChange = (page, pageSize) => {
        // setUserList({
        //   ...userList,
        //   pagination: { ...pagination, page: page, limit: pageSize }
        // });
        setQuery({
            ...query,
            page: page,
            limit: pageSize
        });
    };

    const handleSearchChange = (value) => {
        setQuery({
            ...query,
            search: value
        });
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

    const handleSortChange = (value) => {
        setQuery({ ...query, sort: value });
    };

    const handleResponseWardData = (wardArr) => {
        return wardArr.map((ward) => ({ ...ward, WardCode: +ward.WardCode }));
    };

    const handleChangeAddress = (name) => {
        const { provinceId, districtId } = getValues();
        if (name === "provinceId") {
            setAddress({ ...address, isSelectAddressChange: true, provinceId });
        } else if (name === "districtId") {
            setAddress({ ...address, isSelectAddressChange: true, districtId });
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
                setValue("imageId", imageId);
                setValue("imageUrl", imageUrl);
                setLoadImage({ isUpload: true, isLoading: false });
                toast.success(msg);
            }
        } catch (e) {
            setLoadImage({ isLoading: false, isUpload: false });
            toast.error(e.message);
        }
    };

    const handleDestroyImage = async () => {
        try {
            setLoadImage({ isLoading: true, isUpload: true });
            const res = await uploadApi.deleteImage(imageId);
            const { msg } = res;
            setLoadImage({ ...initLoadImage });
            if (res?.code === 0) {
                setValue("imageId", "");
                setValue("imageUrl", "");
                toast.success(msg);
            }
        } catch (e) {
            setLoadImage({ ...initLoadImage });
            toast.error(e.message);
        }
    };

    const handleOpenModal = async (action, record) => {
        setModal({ isOpen: true, action: action });
        const isActionCreate = action === CREATE;
        if (!isActionCreate && record?.imageUrl) {
            setLoadImage({ isUpload: true, isLoading: false });
        } else {
            setLoadImage({ ...initLoadImage });
        }

        const copyRecord = { ...record };
        ["password", "email", "confirmPassword"].forEach((e) => delete copyRecord[e]);
        const dataUser = isActionCreate ? { ...initCreateUser } : { ...copyRecord };
        console.log("copyRecord", copyRecord);
        for (const key in dataUser) {
            setValue(key, dataUser[key]);
        }

        const districtArr = await addressService.getDistrict(getValues().provinceId);
        const wardArr = await addressService.getWard(getValues().districtId);

        const copyAddress = {
            ...address,
            isSelectAddressChange: false,
            provinceId: getValues().provinceId,
            districtId: getValues().districtId,
            wardId: getValues().wardId,
            districtList: districtArr,
            wardList: wardArr
        };
        setAddress({ ...copyAddress });
    };

    const handleCancel = () => {
        setModal({ ...modal, isOpen: false });
    };

    const handleSubmitForm = async (userInfo) => {
        try {
            let res;
            ["key", "createdAt", "updatedAt"].forEach((item) => delete userInfo[item]);
            if (isActionCreate) {
                delete userInfo.id;
                res = await userApi.createUser(userInfo);
            } else {
                res = await userApi.updateUser(userInfo);
            }
            await getUserList(queryString);
            toast.success(res.msg);
            handleCancel();
        } catch (e) {
            toast.error(e.message);
        }
    };

    const handleDeleteUser = async (id) => {
        confirm({
            title: "Bạn có chắc chắn xóa người dùng này?",
            icon: <ExclamationCircleOutlined />,
            content: "Bạn sẽ không khôi phục lại được người dùng này !",
            async onOk() {
                try {
                    const { msg } = await userApi.delete(id);
                    await getUserList(queryString);
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
            <UserManageFeature
                query={query}
                onSearchChange={handleSearchChange}
                onSelectChange={handleSelectChange}
                onUnSelectChange={handleUnSelectChange}
            />
            <UserManageTable
                userList={userList}
                query={query}
                onOpenModal={handleOpenModal}
                onPageChange={handlePageChange}
                onDeleteUser={handleDeleteUser}
                onSortChange={handleSortChange}
                getUserList={getUserList}
            />

            <UserManageModal
                userList={userList}
                allCode={allCode}
                address={address}
                modal={modal}
                loadImage={loadImage}
                onCancel={handleCancel}
                onUploadImage={handleUploadImage}
                onDestroyImage={handleDestroyImage}
                onChangeAddress={handleChangeAddress}
                onSubmitForm={handleSubmitForm}
                getUserList={getUserList}
                reactHookForm={{ handleSubmit, control, watch, errors, setValue, getValues }}
            />
        </Content>
    );
}

export default UserManage;
