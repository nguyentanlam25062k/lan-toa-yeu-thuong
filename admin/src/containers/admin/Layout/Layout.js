import ActiveLink from "../../../components/ActiveLink/ActiveLink.js";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Content from "./Content";
import Footer from "./Footer";

function Layout(props) {
  const helloWord = () => {};

  const { children } = props;
  return (
    <>
      <Header />
      <Sidebar />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
