import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li><Link href="/quiz">開始測驗</Link></li>
            <li>
            <details>
              <summary>使用說明</summary>
              <ul className="p-2">
                <li><a>關於測驗</a></li>
                <li><a>應用範圍</a></li>
                <li><a>案例介紹</a></li>
              </ul>
            </details>
          </li>
          <li><a>過往測驗</a></li>
          </ul>
        </div>
        <Link href="/home" className="btn btn-ghost text-xl">GoFlow個人特質測評</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link href="/quiz">開始測驗</Link></li>
          <li>
            <details>
              <summary>使用說明</summary>
              <ul className="p-2">
                <li><a>關於測驗</a></li>
                <li><a>應用範圍</a></li>
                <li><a>案例介紹</a></li>
              </ul>
            </details>
          </li>
          <li><a>過往測驗</a></li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">登入</a>
      </div>
    </div>
  );
};

export default Navbar;
