import React, { useContext, useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import "../styles/MainBoard.css";
import { MyContext } from "../context";
import { API } from "../api";

const TaskDoneColumn = () => {
  const [doneTasks, setDoneTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showTask, showAdd, showUpdate } = useContext(MyContext);

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/tasks/done`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        setDoneTasks(data);
      });
  }, [showTask, showAdd, showUpdate]);

  if (loading) return <div>Loading...</div>;
  else
    return (
      <div className="column">
        <div className="column_header">
          <span className="column_header_dot"></span>
          <span className="column_header_title">Done ({doneTasks.length})</span>
        </div>
        <div className="task_cards_cont">
          {doneTasks.length > 0 ? (
            doneTasks.map((each, index) => {
              return <TaskCard task={each} key={index} />;
            })
          ) : (
            <p className="no_task">No task to show</p>
          )}
        </div>
      </div>
    );
};

export default TaskDoneColumn;
