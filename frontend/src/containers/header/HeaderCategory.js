import './HeaderCategory.scss';
import bar from '../../assets/icons/bar.png';
import milk from '../../assets/icons/milk.png';
import spoon from '../../assets/icons/spoon.png';
import rice from '../../assets/icons/rice.png';
import {BsChevronDown} from 'react-icons/bs';
import {BsChevronUp} from 'react-icons/bs';
import {useState, useRef, useEffect} from "react";
import {Routes, Route, NavLink, Link} from "react-router-dom";
import Collapse from '../../component/collapse/Collapse';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

function HeaderCategory() {
  const [activeCategoryMenu, setActiveCategoryMenu] = useState(false);
  const headerCategoryMenuMainRef = useRef(null);

  return (
    <div className="header-category">
      <div className="container">
        <div className="header-category-menu">
          <div className="header-category-menu-left">
            <div className="header-category-menu-top" onClick={() => setActiveCategoryMenu(!activeCategoryMenu)}>
              <div className="header-category-menu-bar">
                <img src={bar} alt=""/>
              </div>
              <div className="header-category-menu-content">
                <span>Danh mục sản phẩm</span>
                <BsChevronUp
                  className={`header-category-menu-arrow ${activeCategoryMenu ? "active" : ""}`}
                />
              </div>
            </div>
            <div
              className="header-category-menu-main"
              ref={headerCategoryMenuMainRef}
              style={{
                height: activeCategoryMenu ? headerCategoryMenuMainRef?.current?.scrollHeight + "px" : "0px"
              }}
            >
              <ul className="list">
                <li className="item">
                  <img src={milk} alt=""/>
                  <Link to="an-toan-suc-khoe">An toàn, sức khỏe</Link>
                </li>
                <li className="item">
                  <img src={spoon} alt=""/>
                  <Link to="san-pham-thong-thuong">Sản phẩm thông thường</Link>
                </li>
                <li className="item">
                  <img src={rice} alt=""/>
                  <Link to="ho-tro-nong-dan">Hỗ trợ nông dân</Link>
                </li>
                <li className="item">
                  <img src={rice} alt=""/>
                  <Link to="ho-tro-nong-dan">Hỗ trợ nông dân</Link>
                </li>


              </ul>
            </div>
          </div>

          <ul className="header-category-menu-list">
            <li className="header-category-menu-item">
              <NavLink
                to="/"
                className={({isActive}) =>
                  isActive ? 'active' : undefined
                }
              >Trang chủ</NavLink>
            </li>
            <li className="header-category-menu-item">
              <NavLink
                to="news"
                className={({isActive}) =>
                  isActive ? 'active' : undefined
                }
              >
                Tin tức & sự kiện</NavLink>
            </li>
            <li className="header-category-menu-item">
              <NavLink
                to="product"
                className={({isActive}) =>
                  isActive ? 'active' : undefined
                }
              >Sản phẩm</NavLink>
            </li>
            <li className="header-category-menu-item">
              <NavLink
                to="contact"
                className={({isActive}) =>
                  isActive ? 'active' : undefined
                }
              >Liên hệ</NavLink>
            </li>
          </ul>
        </div>

      </div>
      <Collapse>
        <Collapse>
        </Collapse>

      </Collapse>
      <Collapse>
      </Collapse>
    </div>
  );
}

export default HeaderCategory;
