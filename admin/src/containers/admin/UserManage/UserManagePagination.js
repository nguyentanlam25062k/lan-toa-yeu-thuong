import './UserManagePagination.scss';
import PropTypes from 'prop-types';
import {BsSearch, BsFilter} from "react-icons/bs";
import {CgChevronDoubleLeft, CgChevronDoubleRight} from "react-icons/cg";
import {useSelector} from "react-redux";
import {Pagination} from "antd";

function UserManagePagination(props) {
  const {pagination} = useSelector(state => state.user)
  const {page, limit, totalRows} = pagination;
  const {handlePageChange} = props;

  const totalPages = Math.ceil(totalRows / limit);
  const onPageChange = (page, pageSize) => {
    console.log({page, pageSize});
  }

  const onShowSizeChange = (current, size) => {
    console.log({current, size})
  }


  return (
    <div className="user-manage-pagination">
      <Pagination
        total={85}
        showSizeChanger
        showQuickJumper
        showTotal={total => `Total ${total} items`}
        onChange={onPageChange}
        // onShowSizeChange={onShowSizeChange}
      />
    </div>
  );
}

UserManagePagination.propTypes = {
  // pagination: PropTypes.object.isRequired,
  handlePageChange: PropTypes.func
}

UserManagePagination.defaultProps = {
  handlePageChange: null
}

export default UserManagePagination;
