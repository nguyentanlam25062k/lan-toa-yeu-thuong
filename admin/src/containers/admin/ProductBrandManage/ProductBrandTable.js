import "./ProductBrandTable.scss";
import { Table, Tag, Space, Card, Pagination, Button, Image } from "antd";
import { UPDATE, CREATE } from "../../../constants/index.constant";
import { AiFillCaretDown, AiFillCaretUp, AiFillDelete, AiFillEdit } from "react-icons/ai";
import dayjs from "dayjs";

function ProductBrandTable(props) {
    const { query, brandList, onOpenModal, onDeleteBrand, onPageChange, onUpdateActive, onSortChange } = props;
    const handleBrandListData = (brandList) => {
        return (
            brandList?.length > 0 &&
            brandList.map((brand) => ({
                key: brand?.id,
                id: brand?.id,
                name: brand?.name,
                imageId: brand?.imageId,
                imageUrl: brand?.imageUrl,
                active: brand?.active,
                userData: brand?.userData?.name,
                createdAt: brand?.createdAt,
                updatedAt: brand?.updatedAt
            }))
        );
    };

    const brandData = handleBrandListData(brandList.rows);

    const renderTitle = (title, field) => {
        const ascSort = field;
        const descSort = `-${field}`;
        return (
            <div className="table-title">
                <div>{title}</div>
                <div className="button">
                    <AiFillCaretUp
                        className={`${ascSort === query.sort ? "active" : ""}`}
                        onClick={() => {
                            onSortChange(field);
                        }}
                    />
                    <AiFillCaretDown
                        className={`${descSort === query.sort ? "active" : ""}`}
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
            title: renderTitle("Tên thương hiệu", "name"),
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
            title: renderTitle("Trạng thái", "active"),
            key: "active",
            dataIndex: "active",
            width: 140,
            render: (active, record) => {
                let color = active === 1 ? "green" : "volcano";
                let text = active === 1 ? "Kích hoạt" : "Ẩn";
                return (
                    <Tag color={color} key={active} onClick={() => onUpdateActive(active, record.id)}>
                        {text.toUpperCase()}
                    </Tag>
                );
            }
        },
        {
            title: renderTitle("Ngày tạo", "createdAt"),
            dataIndex: "createdAt",
            key: "createdAt",
            width: 195,
            render: (createdAt) => {
                const formattedDate =
                    createdAt === null ? "Không tồn tại" : dayjs(createdAt).format("HH:mm:ss DD/MM/YYYY");
                return formattedDate;
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
            title: "Người tạo",
            dataIndex: "userData",
            key: "userData",
            width: 190
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
                    <Button className="action-button delete" onClick={() => onDeleteBrand(record.id)}>
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
                Thêm mới thương hiệu
            </Button>
        );
    };

    return (
        <div>
            <Card className="user-manage-table" title="Quản lí thương hiệu" extra={renderAddNewUser()}>
                <Table columns={columns} dataSource={brandData} pagination={false} />
                <div className="user-manage-pagination">
                    <Pagination
                        current={query.page}
                        total={brandList.totalRow}
                        showSizeChanger
                        showQuickJumper
                        defaultPageSize={query.limit}
                        pageSizeOptions={[2, 5, 10, 20, 50]}
                        showTotal={(total) => `Hệ thống có ${brandList.totalRow} người dùng`}
                        onChange={(page, pageSize) => onPageChange(page, pageSize)}
                    />
                </div>
            </Card>
        </div>
    );
}

export default ProductBrandTable;
