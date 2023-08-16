import React, { useContext } from "react";
import { MyContext } from "../context";
import "../styles/MainBoard.css";
import ViewTask from "./ViewTask";

const TaskCard = ({ task }) => {
  const { showTask, setShowTask, setCurrentTask, currentTask, darkMode } =
    useContext(MyContext);
  const handleView = () => {
    setCurrentTask(task);
    setShowTask(true);
  };
  return (
    <div
      onClick={handleView}
      className={`card_container ${darkMode ? "light" : ""}`}
    >
      <div className={`card_title ${darkMode ? "light" : ""}`}>
        {task?.title}
      </div>
      <div className={`card_subtitle ${darkMode ? "light" : ""}`}>
        {task?.subTasks.length} subtasks
      </div>
    </div>
  );
};

export default TaskCard;
