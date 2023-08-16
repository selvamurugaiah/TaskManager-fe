import React, { useContext } from "react";
import Board from "./Board";
import Sidebar from "./Sidebar";
import "../styles/MainBoard.css";
import { Tab } from "react-bootstrap";
import { MyContext } from "../context";

const MainBoard = () => {
  const { darkMode } = useContext(MyContext);
  return (
    <div className={`mainBoard ${darkMode ? "light" : ""}`}>
      <Tab.Container defaultActiveKey="launch">
        <Sidebar />

        <Board />
      </Tab.Container>
    </div>
  );
};

export default MainBoard;
