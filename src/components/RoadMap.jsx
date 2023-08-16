import React from "react";
import TaskColumn from "./TaskColumn";

const RoadMap = () => {
  return (
    <div className="taskBoard">
      {[...Array(1)].map((each, index) => {
        return <TaskColumn key={index} />;
      })}
    </div>
  );
};

export default RoadMap;
