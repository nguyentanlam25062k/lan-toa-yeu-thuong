import { Link } from "react-router-dom";
import { slugify } from "../../../utils";
import { AiOutlineUserAdd, AiOutlineOrderedList, AiTwotoneCrown, AiOutlineQq } from "react-icons/ai";
import "./Sidebar.scss";

function Sidebar() {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* Brand Logo */}
            <a href="../../index3.html" className="brand-link">
                <img
                    src="../../dist/img/AdminLTELogo.png"
                    alt="AdminLTE Logo"
                    className="brand-image img-circle elevation-3"
                    style={{ opacity: ".8" }}
                />
                <span className="brand-text font-weight-light">AdminLTE 3</span>
            </a>
            {/* Sidebar */}
            <div className="sidebar">
                {/* Sidebar user (optional) */}
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img
                            src="../../dist/img/user2-160x160.jpg"
                            className="img-circle elevation-2"
                            alt="User Image"
                        />
                    </div>
                    <div className="info">
                        <a href="#" className="d-block">
                            Alexander Pierce
                        </a>
                    </div>
                </div>
                {/* SidebarSearch Form */}
                <div className="form-inline">
                    <div className="input-group" data-widget="sidebar-search">
                        <input
                            className="form-control form-control-sidebar"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <div className="input-group-append">
                            <button className="btn btn-sidebar">
                                <i className="fas fa-search fa-fw" />
                            </button>
                        </div>
                    </div>
                </div>
                {/* Sidebar Menu */}
                <nav className="mt-2">
                    <ul
                        className="nav nav-pills nav-sidebar flex-column"
                        data-widget="treeview"
                        role="menu"
                        data-accordion="false"
                    >
                        {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
                        {/*<li className="nav-item">*/}
                        {/*  <a href="#" className="nav-link">*/}
                        {/*    <i className="nav-icon fas fa-tachometer-alt"/>*/}
                        {/*    <p>*/}
                        {/*      Quản lí người dùng*/}
                        {/*      <i className="right fas fa-angle-left"/>*/}
                        {/*    </p>*/}
                        {/*  </a>*/}
                        {/*  <ul className="nav nav-treeview">*/}
                        {/*    <li className="nav-item">*/}
                        {/*      <a href="../../index.html" className="nav-link">*/}
                        {/*        <i className="far fa-circle nav-icon"/>*/}
                        {/*        <p>Dashboard v1</p>*/}
                        {/*      </a>*/}
                        {/*    </li>*/}
                        {/*    <li className="nav-item">*/}
                        {/*      <a href="../../index2.html" className="nav-link">*/}
                        {/*        <i className="far fa-circle nav-icon"/>*/}
                        {/*        <p>Dashboard v2</p>*/}
                        {/*      </a>*/}
                        {/*    </li>*/}
                        {/*    <li className="nav-item">*/}
                        {/*      <a href="../../index3.html" className="nav-link">*/}
                        {/*        <i className="far fa-circle nav-icon"/>*/}
                        {/*        <p>Dashboard v3</p>*/}
                        {/*      </a>*/}
                        {/*    </li>*/}
                        {/*  </ul>*/}
                        {/*</li>*/}
                        {[
                            { name: "Quản lí người dùng", icon: <AiOutlineUserAdd /> },
                            { name: "Quản lí danh mục", icon: <AiOutlineOrderedList /> },
                            { name: "Quản lí thương hiệu", icon: <AiTwotoneCrown /> },
                            { name: "Quản lí sản phẩm", icon: <AiOutlineQq /> }
                        ].map((e, index) => (
                            <li className="nav-item" key={index}>
                                <Link to={slugify(e.name)} className="nav-link">
                                    {e.icon ? e.icon : <i className="nav-icon fas fa-tachometer-alt" />}
                                    <p>{e.name}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                {/* /.sidebar-menu */}
            </div>
            {/* /.sidebar */}
        </aside>
    );
}

export default Sidebar;
