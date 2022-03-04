import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import queryString from "query-string";

import React, {useRef, useState} from "react"
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {useEffectOnce, usePrevious, useUpdateEffect} from "react-use";
import uploadApi from "../../../api/upload.api";

import crudConstant from "../../../constants/crud.constant";
import userConstant from "../../../constants/user.constant";
import addressAction from "../../../redux/actions/address.action";
import allCodeAction from "../../../redux/actions/all-code.action";
import userAction from "../../../redux/actions/user.action";
import userSchema from "../../../schema/user.schema";
import Content from "../Layout/Content";

import './UserManage.scss';

import UserManageFeature from "./UserManageFeature";
import UserManageModal from "./UserManageModal";
import UserManagePagination from "./UserManagePagination";
import UserManageTable from "./UserManageTable";

import _ from "lodash";

function UserManage() {
  console.log('rerender UserManage ======')

  const initUser = {
    id: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: userConstant.DEFAULT_GENDER,
    phone: '',
    provinceId: userConstant.DEFAULT_PROVINCE_ID,
    districtId: userConstant.DEFAULT_DISTRICT_ID,
    wardId: userConstant.DEFAULT_WARD_ID,
    imageId: '',
    imageUrl: '',
    role: userConstant.DEFAULT_ROLE,
  };

  const initImage = {
    isUpload: false,
    isLoading: false,
    imageId: '',
    imageUrl: ''
  };

  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const [modal, setModal] = useState({isVisible: true, action: crudConstant.CREATE});
  const [image, setImage] = useState({...initImage});

  const {
    handleSubmit, control, watch, setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {...initUser},
    resolver: yupResolver(userSchema.createUser)
  });


  const {userList, isLoading} = useSelector(state => state.user);
  const {provinceList, districtList, wardList} = useSelector(state => state?.address);

  const [filter, setFilter] = useState({page: 1, limit: 5});

  const query = queryString.stringify(filter);

  const [provinceId, districtId, wardId] = watch(['provinceId', 'districtId', 'wardId']);

  // console.log('userInfo', userInfo)
  useEffectOnce(() => {
    dispatch(addressAction.getProvince());
    dispatch(addressAction.getDistrict(provinceId));
    dispatch(addressAction.getWard(districtId));

    dispatch(allCodeAction.getAllRole());
    dispatch(allCodeAction.getAllGender());

    dispatch(userAction.getUser(query));
  })

  const prev = usePrevious({
    query,
    provinceId: provinceId,
    districtId: districtId,
    wardId: wardId,
    provinceList: provinceList,
    districtList: districtList,
    wardList: wardList
  });

  useUpdateEffect(() => {
    if (prev.query !== query) {
      dispatch(userAction.getUser(query));
    }

    if (prev.provinceId !== provinceId) {
      dispatch(addressAction.getDistrict(provinceId));
    }

    if (prev.districtId !== districtId) {
      dispatch(addressAction.getWard(districtId));
    }

    if (!_.isEqual(prev.districtList, districtList)) {
      setValue("districtId", districtList[0]?.DistrictID);
    }

    if (!_.isEqual(prev.wardList, wardList)) {
      setValue("wardId", wardList[0]?.WardCode);
    }
  }, [query, provinceId, districtId, districtList, wardList]);

  const handleUploadImage = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      console.log('file', file)

      if (!file) {
        return toast.error('File không tồn tại !');
      }

      if (file.size > 1024 * 1024) {
        return toast.error('Dung lượng file chỉ cho phép tối đa 1MB !');
      }

      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        return toast.error(`Định dạng file không hợp lệ !`);
      }

      let formData = new FormData();
      formData.append('image', file);

      setImage({...image, isUpload: true, isLoading: true});
      const res = await uploadApi.uploadImage(formData);
      const {msg} = res;

      if (res?.code === 0) {
        const {imageId, imageUrl} = res.body[0];
        setImage({
          isUpload: true,
          isLoading: false,
          imageId: imageId,
          imageUrl: imageUrl,
        });
        toast.success(msg);

      } else {
        setImage({
          ...image,
          isLoading: false,
          isUpload: false
        })
        toast.error(msg);
      }
    } catch (e) {
      toast.error(e.message);
    }
  }

  const handleDestroyImage = async () => {
    try {
      setImage({...image, isLoading: true, isUpload: true});
      const res = await uploadApi.deleteImage(image.imageId);
      const {msg} = res;

      if (res?.code === 0) {
        setImage({...initImage});
        toast.success(msg)
      } else {
        toast.error(msg);
      }
    } catch (e) {
      toast.error(e.message);
    }
  }

  const handleOpenModal = (action, record) => {
    setModal({...modal, isVisible: true, action: action});
    const dataUser = action === crudConstant.CREATE ? {...initUser} : {...record};
    for (const key in dataUser) {
      setValue(key, dataUser[key]);
    }
  }

  const handleCancel = () => {
    setModal({
      ...modal,
      isVisible: false
    });
  };

  return (
    <Content>
      <UserManageFeature/>
      <UserManageTable
        handleOpenModal={handleOpenModal}
      >
        <UserManagePagination/>
      </UserManageTable>
      <UserManageModal
        modal={modal}
        // userInfo={userInfo}
        handleCancel={handleCancel}
        reactHookForm={{handleSubmit, control, errors, setValue}}
        handleUploadImage={handleUploadImage}
        handleDestroyImage={handleDestroyImage}
        image={image}
      />

    </Content>
  );
}

export default UserManage;
