import { Modal } from "antd";
import React from "react";
// import userApi from "../../../api/user.api";
import { UPDATE, CREATE } from "../../../constants/index.constant";
import CheckboxField from "../../../custom/fields/CheckboxField/CheckboxField";
import InputField from "../../../custom/fields/InputField/InputField";
import SelectField from "../../../custom/fields/SelectField/SelectField";
import UploadImageField from "../../../custom/fields/UploadImageField/UploadImageField";
import { toast } from "react-toastify";
import "./UserManageModal.scss";

import { userApi } from "../../../api/index.api";
function UserManageModal(props) {
    const {
        modal,
        allCode,
        address,
        loadImage,
        onCancel,
        onUploadImage,
        onDestroyImage,
        onChangeAddress,
        onSubmitForm,
        getUserList,
        userList,
        reactHookForm: { handleSubmit, watch, errors, control, getValues }
    } = props;

    const { isOpen, action } = modal;
    const { provinceList, districtList, wardList } = address;
    const disabled = action === UPDATE;
    const isActionCreate = action === CREATE;

    const handleAllCodeListData = (listData) => {
        return listData.length > 0
            ? listData.map((data) => ({
                  label: data.value,
                  value: data.keyMap
              }))
            : [];
    };

    const handleStreetListData = (streetList, name) => {
        return streetList?.length > 0
            ? streetList.map((street) => ({
                  label: street[`${name === "Ward" ? "Ward" : name}Name`],
                  value: +street[`${name === "Ward" ? "WardCode" : name + "ID"}`]
              }))
            : [];
    };

    return (
        <Modal
            className="user-manage-modal"
            title={action === CREATE ? "Thêm mới người dùng" : "Sửa thông tin người dùng"}
            footer={null}
            width={900}
            onCancel={onCancel}
            visible={isOpen}
            // style={{ height: 'calc(100vh - 100px)' }}
            // bodyStyle={{ overflowY: 'scroll' }}
        >
            {
                <form className="form" onSubmit={handleSubmit(onSubmitForm)}>
                    <div className="form-body">
                        <div className="form-body-item left">
                            {[
                                { type: "input", name: "email", label: "Email", placeholder: "Email", disabled },
                                {
                                    type: "input",
                                    name: "password",
                                    label: "Mật khẩu",
                                    placeholder: "Mật khẩu",
                                    disabled
                                },
                                {
                                    type: "input",
                                    name: "confirmPassword",
                                    label: "Xác nhận lại mật khẩu",
                                    placeholder: "Xác nhận lại mật khẩu",
                                    disabled
                                },
                                { type: "input", name: "name", label: "Họ và tên", placeholder: "Họ và tên" },
                                {
                                    type: "checkbox",
                                    name: "gender",
                                    label: "Giới tính",
                                    options: handleAllCodeListData(allCode.genderList)
                                },
                                { type: "input", name: "phone", label: "Số điện thoại", placeholder: "Số điện thoại" },
                                {
                                    type: "checkbox",
                                    name: "role",
                                    label: "Vai trò",
                                    options: handleAllCodeListData(allCode.roleList)
                                }
                            ].map((item, index) =>
                                item.type === "input" ? (
                                    <InputField
                                        key={index}
                                        control={control}
                                        errors={errors}
                                        name={!item.disabled ? item.name : undefined}
                                        label={item.label}
                                        placeholder={item.placeholder}
                                        disabled={item.disabled}
                                    />
                                ) : (
                                    <CheckboxField
                                        key={index}
                                        control={control}
                                        errors={errors}
                                        name={item.name}
                                        label={item.label}
                                        options={item.options}
                                    />
                                )
                            )}
                        </div>
                        <div className="form-body-item right">
                            <SelectField
                                control={control}
                                errors={errors}
                                getValues={getValues}
                                invisibleError="email"
                                name="provinceId"
                                label="Tỉnh / Thành phố"
                                options={handleStreetListData(provinceList, "Province")}
                                onChangeAddress={onChangeAddress}
                            />
                            <SelectField
                                control={control}
                                errors={errors}
                                invisibleError="password"
                                name="districtId"
                                label="Quận / Huyện"
                                options={handleStreetListData(districtList, "District")}
                                onChangeAddress={onChangeAddress}
                            />
                            <SelectField
                                control={control}
                                errors={errors}
                                invisibleError="confirmPassword"
                                name="wardId"
                                label="Phường / Xã"
                                options={handleStreetListData(wardList, "Ward")}
                            />

                            <UploadImageField
                                control={control}
                                watch={watch}
                                getValues={getValues}
                                nameId="imageId"
                                nameUrl="imageUrl"
                                label="Tải hình ảnh"
                                onUploadImage={onUploadImage}
                                onDestroyImage={onDestroyImage}
                                loadImage={loadImage}
                            />
                        </div>
                    </div>
                    <div className="form-buttons">
                        <span
                            style={{
                                width: 120,
                                display: "inline-block",
                                backgroundColor: "#cccccc"
                            }}
                            onClick={() => {
                                console.log("userList", userList);
                            }}
                        >
                            check state
                        </span>
                        <button className="ant-btn cancel" onClick={onCancel}>
                            <span>Hủy</span>
                        </button>
                        <button type="submit" className="ant-btn ant-btn-primary submit">
                            <span>Xác nhận</span>
                        </button>
                    </div>
                </form>
            }
        </Modal>
    );
}

export default UserManageModal;
