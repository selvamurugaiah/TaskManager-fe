import React, { useContext, useEffect, useState } from "react";
import { API } from "../api";
import { MyContext } from "../context";
import TaskColumn from "./TaskColumn";
import TaskDoingColumn from "./TaskDoingColumn";
import TaskDoneColumn from "./TaskDoneColumn";

const PlatformLaunch = () => {
  const { darkMode } = useContext(MyContext);
  return (
    <div className={`taskBoard ${darkMode ? "light" : ""}`}>
      <TaskColumn />
      <TaskDoingColumn />
      <TaskDoneColumn />
    </div>
  );
};

export default PlatformLaunch;
