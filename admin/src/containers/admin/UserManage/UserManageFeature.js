import './UserManageFeature.scss';
import {Select} from 'antd';
import {Input} from 'antd';

const {Option} = Select;
const {Search} = Input;

function UserManageFeature() {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  const onSearch = value => console.log(value);

  return (
    <div className="user-manage-feature">
      <Select
        className="select"
        defaultValue="0"
        onChange={handleChange}
      >
        <Option value="0">Vai trò</Option>
        <Option value="1">Người dùng</Option>
        <Option value="2">Quản trị viên</Option>
        <Option value="3">Admin supper</Option>
      </Select>
      <Search
        className="input-search"
        placeholder="Nhập tên người dùng"
        onSearch={onSearch}
        enterButton="Search"
      />
    </div>
  );
}

export default UserManageFeature;
