import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import ProductCategoryManage from "./containers/admin/ProductCategoryManage/ProductCategoryManage.js";
import Layout from "./containers/admin/Layout/Layout.js";
import UserManage from "./containers/admin/UserManage/UserManage.js";
import ProductBrandManage from "./containers/admin/ProductBrandManage/ProductBrandManage";
import ProductManage from "./containers/admin/ProductManage/ProductManage";

function App() {
    return (
        <div className="app">
            <div className="wrapper">
                <Layout>
                    <Routes>
                        <Route path="/quan-li-nguoi-dung" element={<UserManage />} />
                        <Route path="/quan-li-danh-muc" element={<ProductCategoryManage />} />
                        <Route path="/quan-li-thuong-hieu" element={<ProductBrandManage />} />
                        <Route path="/quan-li-san-pham" element={<ProductManage />} />
                        <Route path="/*" element={<UserManage />} />
                    </Routes>
                </Layout>
            </div>
            {/*<Routes>*/}
            {/*  <Route path="/admin/quan-li-nguoi-dung" element={<Admin/>}/>*/}
            {/*  <Route path="/admin/*" element={<Admin/>}/>*/}
            {/*  <Route path="/*" element={<Client/>}/>*/}
            {/*</Routes>*/}
            <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
    );
}

export default App;
