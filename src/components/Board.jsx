import React, { useContext } from "react";
import { Tab } from "react-bootstrap";
import { MyContext } from "../context";
import EditTask from "./EditTask";
import MarketingPlan from "./MarketingPlan";
import PlatformLaunch from "./PlatformLaunch";
import RoadMap from "./RoadMap";
import TaskColumn from "./TaskColumn";
import ViewTask from "./ViewTask";

const Board = () => {
  const { showTask, setShowTask, showUpdate, setShowUpdate } =
    useContext(MyContext);
  return (
    <Tab.Content>
      <Tab.Pane eventKey="launch">
        <PlatformLaunch />
      </Tab.Pane>
      <ViewTask show={showTask} onHide={() => setShowTask(false)} />
      <EditTask show={showUpdate} onHide={() => setShowUpdate(false)} />
    </Tab.Content>
  );
};

export default Board;
