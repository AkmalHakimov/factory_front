import React from "react";
import "../Header/Header.scss";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header-component">
      <section className="head-sec">
        <nav className="head-nav">
          <div className="left">
            <Link to={"/"} style={{textDecoration:"none"}}><p className="main-par">Akmal's Blog</p></Link>
          </div>
          <div className="right">
            <ul>
            <Link style={{color:"#162232",textDecoration:"none"}} to={"/blog"}><li>Blog</li></Link>
              <li>Talks</li>
              <Link style={{color:"#162232",textDecoration:"none"}} target="_blank" to={"https://t.me/+fMG5UDuKZC5iMzBi"}><li>Channel</li></Link>
            </ul>
          </div>
        </nav>
      </section>
    </header>
  );
}

export default Header;
