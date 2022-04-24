import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/SabkiDukaan-logos_black.png";
import NavBar from "./NavBar";
import { Container } from "@mui/material";
const Header = () => {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <Link to="/">
        <span
          className="mr-auto cursor-pointer"
          style={{ marginRight: "auto", cursor: "pointer" }}
        >
          <img src={Logo} alt="logo" width={100} />
        </span>
      </Link>
      <NavBar />
    </nav>
  );
};

export default Header;
