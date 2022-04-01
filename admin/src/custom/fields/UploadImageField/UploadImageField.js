import {Image} from "antd";
import {useController} from "react-hook-form";
import PropTypes from "prop-types";
import React, {useState} from "react";
import Select from "react-select";
import {AiOutlinePlus, AiOutlineLoading, AiOutlineClose} from "react-icons/ai";

UploadImageField.propTypes = {
  control: PropTypes.object.isRequired,
  // name: PropTypes.string.isRequired,

  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.array,
  defaultValue: PropTypes.number,
}

UploadImageField.defaultProps = {
  label: '',
  placeholder: '',
  disabled: false,
  options: []
}

function UploadImageField(props) {

  const {getValues, label, name, onUploadImage, onDestroyImage,
    loadImage: {isUpload, isLoading}
  } = props;
  const {imageUrl} = getValues();

  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <div className="form-group-upload">
        <div className="wrap">
          {isUpload ? (
            <>
              {isLoading ? (
                <AiOutlineLoading className="loading"/>
              ) : (
                <div className="wrap-image">
                  <AiOutlineClose
                    className="close"
                    onClick={onDestroyImage}
                  />
                  <Image
                    src={imageUrl}
                  />
                </div>

              )}
            </>) : (
            <>
              <input
                type="file"
                onChange={e => onUploadImage(e)}
              />
              <AiOutlinePlus className="icon"/>
              <div className="title">Upload</div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default UploadImageField;