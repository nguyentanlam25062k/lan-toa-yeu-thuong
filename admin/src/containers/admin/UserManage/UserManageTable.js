import {Table, Tag, Space, Card, Image, Button, Modal} from 'antd';
import {Avatar} from 'antd';
import {AiOutlineWoman, AiOutlineMan} from "react-icons/ai";
import './UserManageTable.scss';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import crudConstant from "../../../constants/crud.constant";

const data = [
  {
    key: '1',
    name: 'John Brown',
    image: 32,
    gender: 0,
    phone: '0929697412',
    role: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    image: 42,
    gender: 1,
    phone: '0929697412',
    role: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    image: 32,
    gender: 0,
    phone: '0929697412',
    role: ['cool', 'teacher'],
  },
];


function UserManageTable(props) {
  const {children, handleOpenModal} = props;
  const {userList} = useSelector(state => state.user);

  const handleUserListData = (users) => {
    return users?.length > 0 && users.map((user) => ({
      key: user?.id,
      id: user?.id,
      email: user?.email,
      password: user?.password,
      confirmPassword: user?.password,
      name: user?.name,
      gender: user?.gender,
      phone: user?.phone,
      role: user?.role,
      provinceId: user?.provinceId,
      districtId: user?.districtId,
      wardId: user?.wardId,
      imageId: user?.imageId,
      imageUrl: user?.imageUrl
    }))
  }

  let userData = handleUserListData(userList);

  const columns = [
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'age',
      key: 'age',
      render: age => (
        <Image
          width={60}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
      )
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      render: gender => gender === 'G1' ? "Nam" : "Nữ"
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Quyền hạn',
      key: 'role',
      dataIndex: 'role',
      render: role => (
        <>
          <Tag color={role.length > 5 ? 'geekblue' : 'green'} key={role}>
            {role.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <Button
            className="action-button edit"
            onClick={() => handleOpenModal(crudConstant.UPDATE, record)}
          >
            Chi tiết
          </Button>
          <Button className="action-button delete">Xóa</Button>
        </Space>
      ),
    },
  ];



  const renderAddNewUser = () => {
    return (
      <Button type="primary" onClick={() => handleOpenModal(crudConstant.CREATE)}>
        Thêm mới người dùng
      </Button>
    )
  }

  return (
    <Card
      className="user-manage-table"
      title="Quản lí người dùng"
      extra={renderAddNewUser()}
    >
      <Table
        columns={columns}
        dataSource={userData}
        pagination={false}
        bordered={true}
      />
      {children}
    </Card>


  );
}

export default UserManageTable;
