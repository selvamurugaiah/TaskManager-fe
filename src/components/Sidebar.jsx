import React, { useContext, useState } from "react";
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import { MyContext } from "../context";

const Sidebar = () => {
  const { user, setUser, darkMode, setDarkMode, setIsAdmin } =
    useContext(MyContext);
  const navigate = useNavigate();
  const handleLogOut = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/users/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    if (res.status == 200) {
      setUser("");
      localStorage.clear();
      setIsAdmin(false);
      navigate("/login");
    }
  };
  return (
    <div className={`sideBar desktop ${darkMode ? "light" : ""}`}>
      <div className="sideBar_top">
        <div className="sideBar_top_title">All Boards </div>
        <div className="sideBar_top_features_cont">
          <button className={`sideBar_top_features ${darkMode ? "light" : ""}`}>
            <Nav.Link eventKey="launch">
              <i className="fa-solid fa-border-all"></i>Platform Launch
            </Nav.Link>
          </button>
        
        </div>
        <button
          onClick={() => navigate("/subscriptions")}
          className="sideBar_top_features createBtn"
        >
          <i className="fa-solid fa-border-all"></i>Pricing
        </button>
      </div>
      <div className="sideBar__bottom">
        <div className="sideBar__theme">
          <i class="fa-solid fa-moon"></i>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="sideBar__theme_toggle"
          >
            <span
              className="sideBar__theme_toggle_ball"
              style={darkMode ? { right: "10%" } : { left: "10%" }}
            ></span>
          </button>

          <i class="fa-solid fa-sun"></i>
        </div>
        <button className="sideBar_top_features logout" onClick={handleLogOut}>
          <i class="fa-solid fa-arrow-right-from-bracket"></i> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
