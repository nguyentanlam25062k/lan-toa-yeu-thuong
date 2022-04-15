import { Modal, Image } from "antd";
import { UPDATE, CREATE } from "../../../constants/index.constant";
import "./ProductBrandModal.scss";
import { AiOutlinePlus, AiOutlineLoading, AiOutlineClose } from "react-icons/ai";

import { userApi } from "../../../api/index.api";
function ProductBrandModal(props) {
    const { modal, brand, onCancel, loadImage, onDestroyImage, onUploadImage, onInputChange, onSubmitForm } = props;
    const { action, isOpen } = modal;
    const { isUpload, isLoading } = loadImage;

    const onFinish = (values) => {
        console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Modal
            className="user-manage-modal"
            title={action === CREATE ? "Thêm mới thương hiệu" : "Sửa thông tin thương hiệu"}
            footer={null}
            width={600}
            onCancel={onCancel}
            visible={isOpen}
            // style={{ height: 'calc(100vh - 100px)' }}
            // bodyStyle={{ overflowY: 'scroll' }}
        >
            <form action="">
                <div className="form-group">
                    <label>Tên thương hiệu</label>
                    <input type="text" value={brand.name} onChange={(e) => onInputChange(e.target.value, "name")} />
                    {/* <div className="err-message">hom nay tao buon</div> */}
                </div>
                <div className="form-group upload">
                    <label>Ảnh thương hiệu</label>
                    <div className="wrap">
                        {isUpload ? (
                            <>
                                {isLoading ? (
                                    <AiOutlineLoading className="loading" />
                                ) : (
                                    <div className="wrap-image">
                                        <AiOutlineClose className="close" onClick={onDestroyImage} />
                                        <Image src={brand.imageUrl} />
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <input type="file" onChange={(e) => onUploadImage(e)} />
                                <AiOutlinePlus className="icon" />
                                <div className="title">Upload</div>
                            </>
                        )}
                    </div>
                </div>
                <div className="form-group radio">
                    <label htmlFor="">Trạng thái</label>
                    <div className="wrap">
                        {[
                            { label: "Ẩn", value: 0 },
                            { label: "Kích hoạt", value: 1 }
                        ].map((item, index) => (
                            <div className="wrap-item" key={index}>
                                <label htmlFor="">{item.label}</label>
                                <input
                                    type="radio"
                                    value={item.value}
                                    name="active"
                                    onChange={(e) => onInputChange(+e.target.value, "active")}
                                    checked={brand.active === item.value}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="form-group button">
                    <span
                        style={{
                            width: 120,
                            display: "inline-block",
                            backgroundColor: "#cccccc"
                        }}
                        onClick={() => {
                            console.log("modal", modal);
                            console.log("loadImage", loadImage);
                            console.log("brand", brand);
                        }}
                    >
                        check state
                    </span>
                    <button className="ant-btn cancel" onClick={(e) => onCancel(e)}>
                        <span>Hủy</span>
                    </button>
                    <button type="submit" onClick={(e) => onSubmitForm(e)} className="ant-btn ant-btn-primary submit">
                        <span>Xác nhận</span>
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default ProductBrandModal;
