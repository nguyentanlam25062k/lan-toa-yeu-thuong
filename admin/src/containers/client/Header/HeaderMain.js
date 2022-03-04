import './HeaderMain.scss';
import logo from '../../../assets/icons/logo.png';
import hotSale from '../../../assets/icons/hot-sale.png';
import cartUser from '../../../assets/icons/cart-user.png';
import search from '../../../assets/icons/search.png';

function HeaderMain() {
  return (
    <div className="header-main">
      <div className="container">
        <div className="header-main-logo">
          <img src={logo} alt=""/>
        </div>
        <div className="header-main-right">
          <div className="header-main-search">
            <input type="text" placeholder="nhập tên hoặc mã sản phẩm..."/>
            <div className="wrap-icon">
              <img src={search} alt=""/>
            </div>
          </div>
          <div className="header-main-hot-sale">
            <img src={hotSale} alt=""/>
            <div className="content">
              <span>mặt hàng đến 50%</span>
            </div>
          </div>
          <div className="header-main-cart">
            <div className="header-main-cart-icon">
              <img src={cartUser} alt=""/>
              <span className="header-main-cart-amount">4</span>
            </div>
            <span className="header-main-cart-price">34,000đ</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderMain;
