import './Header.scss';
import cartIcon from '../../assets/icons/cart.png';
import boxIcon from '../../assets/icons/box.png';
import medalIcon from '../../assets/icons/medal.png';
import headphoneIcon from '../../assets/icons/headphone.png';
import peopleIcon from '../../assets/icons/people.png';
import HeaderTop from "./HeaderTop";
import HeaderMain from "./HeaderMain";
import HeaderCategory from "./HeaderCategory";

function Header() {
  return (
    <>
      <HeaderTop/>
      <HeaderMain/>
      <HeaderCategory/>
    </>
  );
}

export default Header;
