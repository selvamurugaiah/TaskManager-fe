import React, { useContext, useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import "../styles/MainBoard.css";
import { MyContext } from "../context";
import { API } from "../api";

const TaskColumn = () => {
  const [todoTasks, setTodoTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showTask, showAdd, showUpdate } = useContext(MyContext);

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/tasks/todo`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        setTodoTasks(data);
      });
  }, [showTask, showAdd, showUpdate]);

  if (loading) return <div>Loading...</div>;
  else
    return (
      <div className="column">
        <div className="column_header">
          <span className="column_header_dot"></span>
          <span className="column_header_title">TODO ({todoTasks.length})</span>
        </div>
        <div className="task_cards_cont">
          {todoTasks.length > 0 ? (
            todoTasks.map((each, index) => {
              return <TaskCard key={index} task={each} />;
            })
          ) : (
            <p className="no_task">No tasks to show</p>
          )}
        </div>
      </div>
    );
};

export default TaskColumn;
