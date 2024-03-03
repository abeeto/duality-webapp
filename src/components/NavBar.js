import React from "react";
import { AuthButton } from "./AuthButton";
const NavBar = () => {

  return (
    <nav className="nav-bar">
      <h1>React Chat</h1>
      <AuthButton />
    </nav>
  );
};

export default NavBar;