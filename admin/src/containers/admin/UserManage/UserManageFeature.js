import "./UserManageFeature.scss";
import { Select } from "antd";
import { Input } from "antd";
import { AiOutlineReload, AiOutlineDelete } from "react-icons/ai";
const { Option } = Select;
const { Search } = Input;

function UserManageFeature(props) {
  const {
    query: {
      where: { role, gender }
    },
    onSearchChange,
    onSelectChange,
    onUnSelectChange
  } = props;

  return (
    <div className="user-manage-feature">
      <div className="left">
        <Select className="select" value={role} onChange={(value) => onSelectChange(value, "role")}>
          <Option value="ALL">Vai trò</Option>
          <Option value="R1">Người dùng</Option>
          <Option value="R2">Quản trị viên</Option>
          <Option value="R3">Admin supper</Option>
        </Select>
        <Select className="select" value={gender} onChange={(value) => onSelectChange(value, "gender")}>
          <Option value="ALL">Giới tính</Option>
          <Option value="G1">Nam</Option>
          <Option value="G2">Nữ</Option>
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
        placeholder="Nhập tên người dùng 123"
        onChange={(e) => onSearchChange(e.target.value)}
        enterButton="Search"
      />
    </div>
  );
}

export default UserManageFeature;
