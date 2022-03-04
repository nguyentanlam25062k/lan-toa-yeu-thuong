import {axios} from "../utils/axios";

const axiosConfig = {
  headers: {
    contentType: 'multipart/form-data',
  }
}

const uploadApi = {};

uploadApi.uploadImage = (formData) => {
  return axios.post(`/upload-image`, formData, axiosConfig);
}

uploadApi.deleteImage = (imageId) => {
  return axios.delete(`/delete-image`, {data: {imageId: imageId}});
}




export default uploadApi;