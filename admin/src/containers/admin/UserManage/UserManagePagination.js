import "./UserManagePagination.scss";
import PropTypes from "prop-types";
import { BsSearch, BsFilter } from "react-icons/bs";
import { CgChevronDoubleLeft, CgChevronDoubleRight } from "react-icons/cg";
import { useSelector } from "react-redux";
import { Pagination } from "antd";

function UserManagePagination(props) {
  const { query, userList, onPageChange } = props;

  const { totalRow } = userList;
  const { page, limit } = query;
  // const totalPages = Math.ceil(totalRow / limit);

  return (
    <div className="user-manage-pagination">
      <Pagination
        current={page}
        total={totalRow}
        showSizeChanger
        showQuickJumper
        pageSizeOptions={[2, 5, 10, 20, 50]}
        showTotal={(total) => `Hệ thống có ${totalRow} người dùng`}
        onChange={(page, pageSize) => onPageChange(page, pageSize)}
      />
    </div>
  );
}

UserManagePagination.propTypes = {
  // pagination: PropTypes.object.isRequired,
  handlePageChange: PropTypes.func
};

UserManagePagination.defaultProps = {
  handlePageChange: null
};

export default UserManagePagination;
