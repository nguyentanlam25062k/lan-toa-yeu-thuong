import "./ProductBrandFeature.scss";
import { Select } from "antd";
import { Input } from "antd";
import { AiOutlineReload, AiOutlineDelete } from "react-icons/ai";
const { Option } = Select;
const { Search } = Input;

function ProductBrandFeature(props) {
    const {
        query: {
            where: { active, gender }
        },
        onSearchChange,
        onSelectChange,
        onUnSelectChange
    } = props;

    return (
        <div className="user-manage-feature">
            <div className="left">
                <Select className="select" value={active} onChange={(value) => onSelectChange(value, "active")}>
                    <Option value="ALL">Trạng thái</Option>
                    <Option value="1">Kích hoạt</Option>
                    <Option value="0">Ẩn</Option>
                </Select>

                <button className="button unselect" onClick={() => onUnSelectChange()}>
                    <span className="button-icon">
                        <AiOutlineDelete />
                    </span>
                    <span>Xóa chọn</span>
                </button>
                <button className="button refresh" onClick={() => window.location.reload()}>
                    <span className="button-icon">
                        <AiOutlineReload />
                    </span>
                    <span>Làm mới</span>
                </button>
            </div>
            <Search
                className="input-search"
                placeholder="Nhập tên thương hiệu sản phẩm"
                onChange={(e) => onSearchChange(e.target.value)}
                enterButton="Search"
            />
        </div>
    );
}

export default ProductBrandFeature;
