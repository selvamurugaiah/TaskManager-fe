import React, { useState, useEffect, useContext } from "react";
import { API } from "../api";
import { MyContext } from "../context";
import TaskColumn from "./TaskColumn";
import TaskDoingColumn from "./TaskDoingColumn";
import TaskDoneColumn from "./TaskDoneColumn";

const MarketingPlan = () => {
  const [todoTasks, setTodoTasks] = useState([]);
  const [doingTasks, setDoingTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const { showUpdate, showAdd } = useContext(MyContext);

  useEffect(() => {
    fetch(`${API}/tasks/marketing`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTodoTasks(
          data.filter((each) => each.status == "Todo").length > 0
            ? data.filter((each) => each.status == "Todo")
            : []
        );
        setDoingTasks(
          data.filter((each) => each.status == "Doing").length > 0
            ? data.filter((each) => each.status == "Doing")
            : []
        );
        setDoneTasks(
          data.filter((each) => each.status == "Done").length > 0
            ? data.filter((each) => each.status == "Done")
            : []
        );
      });
  }, [showUpdate, showAdd]);
  return (
    <div className="taskBoard">
      <TaskColumn tasks={todoTasks} />
      <TaskDoingColumn tasks={doingTasks} />
      <TaskDoneColumn tasks={doneTasks} />
    </div>
  );
};

export default MarketingPlan;
