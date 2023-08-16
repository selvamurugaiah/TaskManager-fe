import React, { useContext } from "react";
import { Modal, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import { MyContext } from "../context";

const MobileNav = (props) => {
  const { darkMode, setDarkMode, setIsAdmin, user, setUser, setShowMobile } =
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
      setShowMobile(false);
      setIsAdmin(false);
      setUser("");
      localStorage.clear();
      navigate("/login");
    }
  };
  return (
    <Modal {...props} size="lg" className="addTask_modal_container mobileNav">
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="sideBar_top_title"
        >
          All Boards
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="MobileNav_body">
          <div className="MobileNav_body_top">
            <div className="MobileNav_body_top_cont">
              <button className="sideBar_top_features">
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
          <div className="mobileNav__bottom">
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
            <button
              className="sideBar_top_features logout"
              onClick={handleLogOut}
            >
              <i class="fa-solid fa-arrow-right-from-bracket"></i> Logout
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MobileNav;
