import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.svg";
import "./LogoHeader.css";

function LogoHeader() {
  return (
    <Link href="#" to="/" rel="noopener noreferrer">
      <img className="LogoHeader" src={Logo} alt="логотип" />
    </Link>
  );
}

export default LogoHeader;
