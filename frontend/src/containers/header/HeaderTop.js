import './HeaderTop.scss';
import cartIcon from '../../assets/icons/cart.png';
import boxIcon from '../../assets/icons/box.png';
import medalIcon from '../../assets/icons/medal.png';
import headphoneIcon from '../../assets/icons/headphone.png';
import peopleIcon from '../../assets/icons/people.png';

function HeaderTop() {
  return (
    <div className="header-top">
      <div className="container">
        <ul className="header-top-list">
          <li className="header-top-item">
            <img src={cartIcon} alt=""/>
            <span>Miễn phí vẫn chuyển</span>
          </li>
          <li className="header-top-item">
            <img src={boxIcon} alt=""/>
            <span>Nguyên tắc đổi trả</span>
          </li>
          <li className="header-top-item">
            <img src={medalIcon} alt=""/>
            <span>Đảm bảo về chất lượng</span>
          </li>
          <li className="header-top-item">
            <img src={headphoneIcon} alt=""/>
            <span>CSKH: 0914 093 563</span>
          </li>
        </ul>
        <div className="header-top-right">
          <img src={peopleIcon} alt=""/>
          <div className="header-top-login">
            <span>Đăng nhập</span> &
            <span>Đăng ký</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderTop;
