import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import { MyContext } from "../context";
import "../styles/ViewTask.css";

const ViewTask = (props) => {
  const navigate = useNavigate();
  const {
    currentTask,
    setCurrentTask,
    showUpdate,
    setShowUpdate,
    setShowTask,
    showTask,
    isAdmin,
    user,
    darkMode,
  } = useContext(MyContext);

  console.log(currentTask);

  const handleUpdateModal = () => {
    setShowUpdate(true);
    setShowTask(false);
  };

  const handleDelete = async () => {
    const { status } = await fetch(`${API}/tasks/${currentTask._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/",
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    if (status == 200) {
      showTask(false);
    }
  };

  return (
    <Modal {...props} size="lg" className="addTask_modal_container" centered>
      <Modal.Header className={`${darkMode ? "light" : ""}`} closeButton>
        <Modal.Title id="contained-modal-title-vcenter">View Task</Modal.Title>
      </Modal.Header>
      {!currentTask && <div>loading...</div>}
      {currentTask && (
        <Modal.Body className={`${darkMode ? "light" : ""}`}>
          <h3 className="viewTask_description">
            {!currentTask?.description
              ? "No description"
              : currentTask.description}
          </h3>
          <div className="viewTask_subTasks">
            <h3 className="subTasks_title">
              SubTasks ({currentTask.subTasks.length})
            </h3>
            {currentTask?.subTasks.map((sub, index) => (
              <p key={index} className="subTask">
                - {sub}
              </p>
            ))}
          </div>
          <div className="viewTask_status">
            <h3 className="viewTask_status_key">Current Status</h3>
            <p className="viewTask_status_value">{currentTask.status}</p>
          </div>
          {isAdmin && (
            <div className="viewTask_btn">
              <button className="edit" onClick={handleUpdateModal}>
                <i className="fa-solid fa-pen "></i>
                Edit
              </button>
              <button onClick={handleDelete} className="delete">
                <i className="fa-solid fa-trash "></i>
                Delete
              </button>
            </div>
          )}
        </Modal.Body>
      )}
    </Modal>
  );
};

export default ViewTask;
