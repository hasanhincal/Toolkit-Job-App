import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>İş Takip</h1>
      <nav>
        <NavLink to={"/"}>İş Listesi</NavLink>
        <NavLink to={"/new"}>İş Ekle</NavLink>
      </nav>
    </header>
  );
};

export default Header;
