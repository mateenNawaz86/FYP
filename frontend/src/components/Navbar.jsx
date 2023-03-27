import React from "react";
import logoImg from "../assets/img/logo.png";

const Navbar = () => {
  return (
    <>
      <header className="p-4 flex justify-between items-center">
        <div>
          <img src={logoImg} alt="logo" className="h-16 w-16" />
        </div>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/">About Us</a>
            </li>
            <li>
              <a href="/">Services</a>
            </li>
            <li>
              <a href="/">Become Provider</a>
            </li>
            <li>
              <a href="/">Contact US</a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
