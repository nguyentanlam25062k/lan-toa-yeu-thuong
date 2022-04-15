import { Button, Card, Image, Space, Table, Tag } from "antd";
import UserManagePagination from "./UserManagePagination";
import { UPDATE, CREATE } from "../../../constants/index.constant";
import "./UserManageTable.scss";
import { AiFillCaretDown, AiFillCaretUp, AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useSetState } from "react-use";
import dayjs from "dayjs";

function UserManageTable(props) {
    const { userList, query, onOpenModal, onPageChange, onDeleteUser, onSortChange } = props;
    const { rows } = userList;
    const { sort } = query;
    const [activeColumn, setActiveColumn] = useSetState(null);

    const handleUserListData = (users) => {
        return (
            users?.length > 0 &&
            users.map((user) => ({
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
                imageUrl: user?.imageUrl,
                createdAt: user?.createdAt,
                updatedAt: user?.updatedAt
            }))
        );
    };

    let userData = handleUserListData(rows);
    // console.log("sort", sort);
    const renderTitle = (title, field) => {
        const ascSort = field;
        const descSort = `-${field}`;
        console.log({ title, field });
        return (
            <div className="table-title">
                <div>{title}</div>
                <div className="button">
                    <AiFillCaretUp
                        className={`${ascSort === sort ? "active" : ""}`}
                        onClick={() => {
                            onSortChange(field);
                        }}
                    />
                    <AiFillCaretDown
                        className={`${descSort === sort ? "active" : ""}`}
                        onClick={() => {
                            onSortChange(`-${field}`);
                        }}
                    />
                </div>
            </div>
        );
    };

    const columns = [
        {
            title: renderTitle("Họ và tên", "name"),
            filterIcon: true,
            dataIndex: "name",
            key: "name",
            width: 190,
            render: (text) => <a>{text}</a>
        },
        {
            title: "Hình ảnh",
            dataIndex: "imageUrl",
            key: "imageUrl",
            width: 120,
            render: (imageUrl) => (
                <Image
                    src={`${
                        imageUrl
                            ? imageUrl
                            : "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    } `}
                />
            )
        },
        {
            title: renderTitle("Giới tính", "gender"),
            dataIndex: "gender",
            key: "gender",
            width: 120,
            render: (gender) => (gender === "G1" ? "Nam" : "Nữ")
        },
        {
            title: renderTitle("Số điện thoại", "phone"),
            dataIndex: "phone",
            key: "phone",
            width: 155
        },
        {
            title: renderTitle("Quyền hạn", "role"),
            key: "role",
            dataIndex: "role",
            width: 140,
            render: (role) => (
                <>
                    <Tag color={role.length > 5 ? "geekblue" : "green"} key={role}>
                        {role.toUpperCase()}
                    </Tag>
                </>
            )
        },
        {
            title: renderTitle("Ngày tạo", "createdAt"),
            dataIndex: "createdAt",
            key: "createdAt",
            width: 195,
            render: (createdAt) => {
                const formattedDate = dayjs(createdAt).format("HH:mm:ss DD/MM/YYYY");
                return formattedDate === "Invalid Date" ? null : formattedDate;
            }
        },
        {
            title: renderTitle("Ngày cập nhập", "updatedAt"),
            dataIndex: "updatedAt",
            key: "updatedAt",
            width: 195,
            render: (updatedAt) => {
                const formattedDate = dayjs(updatedAt).format("HH:mm:ss DD/MM/YYYY");
                return formattedDate === "Invalid Date" ? null : formattedDate;
            }
        },
        {
            title: "Thao tác",
            key: "action",
            render: (record) => (
                <Space size="middle">
                    <Button className="action-button edit" onClick={() => onOpenModal(UPDATE, record)}>
                        <AiFillEdit />
                        <div>Chi tiết</div>
                    </Button>
                    <Button className="action-button delete" onClick={() => onDeleteUser(record.id)}>
                        <AiFillDelete />
                        <div>Xóa</div>
                    </Button>
                </Space>
            )
        }
    ];

    const renderAddNewUser = () => {
        return (
            <Button type="primary" onClick={() => onOpenModal(CREATE)}>
                Thêm mới người dùng
            </Button>
        );
    };

    return (
        <Card className="user-manage-table" title="Quản lí người dùng" extra={renderAddNewUser()}>
            <Table columns={columns} dataSource={userData} pagination={false} bordered={true} />
            <UserManagePagination query={query} userList={userList} onPageChange={onPageChange} />
            {/* <span
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
      </span> */}
        </Card>
    );
}

export default UserManageTable;
