import React from 'react';
import './Navbar.css';
import { Link } from "react-router-dom";

const nav_item = "nav_item"
const isUserLogin = true;
const NoneUserNavItems = () => {
  const items = [
    {
      key: "login",
      to: "/login",
      text: "로그인",
      class: nav_item,
    },
    {
      key: "register",
      to: "/register",
      text: "회원가입",
      class: nav_item,
    },
    {
      key: "upload",
      to: "/file-upload",
      text: "파일 업로드",
      class: nav_item,
    },
    {
      key: "company-upload",
      to: "/company-file-upload",
      text: "회사 게시글 업로드",
      class: nav_item,
    },
  ]

  return (
    <>
        {
          items.map((item) =>
            <Link key={item.key} className={item.class} to={item.to}>
              {item.text}
            </Link>)
        }
    </>
  );
};

const UserNavItems = () => {
  const items = [
    {
      key: "profile",
      text: "내 정보",
      class: nav_item,
    },
    {
      key: "logout",
      text: "로그아웃",
      class: nav_item,
    },
    {
      key: "upload",
      to: "/file-upload",
      text: "파일 업로드",
      class: nav_item,
    },
  ]

  return (
    <>
      {
        items.map((item) =>
        <span key={item.key} className={item.class}>
          {item.text}
        </span>)
      }
    </>
  );
};

const Navbar = () => {
  return (
    <div className='navbar-wrapper'>
      <div className='navbar'>
        <div className="me-auto"></div>
        {
          isUserLogin ?  <NoneUserNavItems/> : <UserNavItems/>
        }
      </div>
    </div>
  );
}

export default Navbar;
