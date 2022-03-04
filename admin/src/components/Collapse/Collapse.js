import './Collapse.scss';
import {BsChevronDown} from 'react-icons/bs';
import {BsChevronUp} from 'react-icons/bs';
import {BsChevronLeft} from 'react-icons/bs';

import {useState, useRef, useEffect} from "react";
import {Routes, Route, NavLink, Link} from "react-router-dom";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

function Collapse(props) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  let {icon, title, children} = props;
  return (
    <div className="collapse">
      <div className="collapse-top">
        {icon ? icon : null}
        <div className="collapse-title">{title ? title : 'Quản lí người dùng'}</div>
        <BsChevronLeft
          className={`collapse-toggle ${isOpen ? "active" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      <div
        className="collapse-content"
        ref={contentRef}
        style={{
          height: isOpen ? contentRef?.current?.scrollHeight + "px" : "0px"
        }}
      >
        {text}
      </div>
    </div>
  );
}

export default Collapse;
