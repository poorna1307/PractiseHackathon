import React from "react";
import NormalNav from "./NavigationBar";
import LoginNav from "./NavbarSignup";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  let loginStatus = localStorage.getItem("login");
  let navigate = useNavigate();
  useEffect(() => {
    if (loginStatus === null) {
      navigate("/");
    }
  }, loginStatus);
  return (
    <div>
      {loginStatus != null ? (
        <>
          <LoginNav />
        </>
      ) : (
        <>
          <NormalNav />
        </>
      )}
    </div>
  );
}

export default Header;
