import {Routes, Route, Link} from "react-router-dom";

import Layout from "../containers/admin/Layout/Layout";
import UserManage from "../containers/admin/UserManage/UserManage";

import './Admin.route.scss'

function Admin() {
  return (
    <div className="wrapper">
        <Layout>
          <Routes>
            <Route path="/manage-user" element={<UserManage/>}/>
            <Route path="/*" element={<UserManage/>}/>
          </Routes>
        </Layout>
    </div>
  );
}

export default Admin;
