import {Modal} from 'antd';
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import uploadApi from "../../../api/upload.api";
import userApi from "../../../api/user.api";
import crudConstant from "../../../constants/crud.constant";
import CheckboxField from "../../../custom/fields/CheckboxField/CheckboxField";
import UploadImageField from "../../../custom/fields/UploadImageField/UploadImageField";
import addressAction from "../../../redux/actions/address.action";
import InputField from "../../../custom/fields/InputField/InputField";
import SelectField from "../../../custom/fields/SelectField/SelectField";
import utils from "../../../utils";
import './UserManageModal.scss'

function UserManageModal(props) {
  const {
    handleCancel,
    modal: {isVisible, action},
    reactHookForm: {handleSubmit, errors, control},
    // userInfo: {provinceId},
    handleAddressSelectChange,
    handleUploadImage,
    handleDestroyImage,
    image
  } = props;

  const {provinceList, districtList, wardList} = useSelector(state => state?.address);
  const {roleList, genderList} = useSelector(state => state?.allCode);






  const handleSubmitForm = async (userInfo) => {
    console.log('errors', errors)
    console.log('userInfo', userInfo);
    // try {
    //   const dataUser = {
    //     ...userInfo,
    //     imageId: image.imageId,
    //     imageUrl: image.imageUrl
    //   }
    //   let res;
    //   if (action === crudConstant.CREATE) {
    //     res = await userApi.createUser(dataUser);
    //   } else {
    //     res = await userApi.updateUser(dataUser);
    //   }
    //
    //   if (res?.code === 0) {
    //     toast.success(res.msg);
    //   }
    // } catch (e) {
    //   toast.error(e.message);
    // }

  };


  const handleListData = (listData) => {
    return listData.length > 0 ? listData.map(data => ({
      label: data.value,
      value: data.keyMap
    })) : []
  }

  const handleStreetDataList = (streetList, name) => {
    return streetList.length > 0 ? streetList.map(street => ({
      label: street[`${name === 'Ward' ? 'Ward' : name}Name`],
      value: street[`${name === 'Ward' ? 'WardCode' : name+'ID'}`]
    })) : []
  }


  return (
    <Modal
      className="user-manage-modal"
      title={action === crudConstant.CREATE ? "Thêm mới người dùng" : "Thông tin người dùng"}
      footer={null}
      width={900}
      onCancel={handleCancel}
      visible={isVisible}
      // style={{ height: 'calc(100vh - 100px)' }}
      // bodyStyle={{ overflowY: 'scroll' }}
    >
      <form className="form" onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="form-body">
          <div className="form-body-item left">
            <InputField
              control={control}
              errors={errors}
              name="email"
              placeholder="Email"
              label="Email"
            />
            <InputField
              control={control}
              errors={errors}
              name="password"
              placeholder="Mật khẩu"
              label="Mật khẩu"
            />
            <InputField
              control={control}
              errors={errors}
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              label="Nhập lại mật khẩu"
            />
            <InputField
              control={control}
              errors={errors}
              name="name"
              placeholder="Họ và tên"
              label="Họ và tên"
            />
            <CheckboxField
              control={control}
              errors={errors}
              name="gender"
              label="Giới tính"
              options={handleListData(genderList)}
            />
            <InputField
              control={control}
              errors={errors}
              name="phone"
              placeholder="Số điện thoại"
              label="Số điện thoại"
            />
            <CheckboxField
              control={control}
              errors={errors}
              name="role"
              label="Vai trò"
              options={handleListData(roleList)}
            />
          </div>
          <div className="form-body-item right">
            <SelectField
              control={control}
              errors={errors}
              errorInvisible="email"
              name="provinceId"
              label="Tỉnh / Thành phố"
              options={handleStreetDataList(provinceList, 'Province')}
            />
            <SelectField
              control={control}
              errors={errors}
              errorInvisible="password"
              name="districtId"
              label="Quận / Huyện"
              options={handleStreetDataList(districtList, 'District')}

            />
            <SelectField
              control={control}
              errors={errors}
              errorInvisible="confirmPassword"
              name="wardId"
              label="Phường / Xã"
              options={handleStreetDataList(wardList, 'Ward')}
            />

            <UploadImageField
              control={control}
              name="image"
              label="Tải hình ảnh"
              handleUploadImage={handleUploadImage}
              handleDestroyImage={handleDestroyImage}
              image={image}
            />

          </div>
        </div>

        <div className="form-buttons">
          <button className="ant-btn cancel" onClick={handleCancel}><span>Hủy</span></button>
          <button type="submit" className="ant-btn ant-btn-primary submit"><span>Xác nhận</span></button>
        </div>
      </form>
    </Modal>
  );
}

export default UserManageModal;
