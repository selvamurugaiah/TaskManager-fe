import React, { useContext, useEffect, useState } from "react";
import * as yup from "yup";
import "../styles/AddTask.css";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { MyContext } from "../context";
import { API } from "../api";
import { Modal } from "react-bootstrap";

const formValidationSchema = yup.object({
  title: yup.string().required("Title is required"),
  subTasks: yup.array().of(yup.string().required("Cannot be empty")).required(),
});

const EditTask = (props) => {
  const [inputFields, setInputFields] = useState([""]);
  const [subTasks, setSubTasks] = useState([]);
  const [task, setTask] = useState("");
  const navigate = useNavigate();
  const {
    currentTask,
    darkMode,
    setCurrentTask,
    showUpdate,
    user,
    setShowUpdate,
  } = useContext(MyContext);

  console.log(currentTask);
  useEffect(() => {
    if (currentTask) {
      fetch(`${API}/tasks/${currentTask._id}`)
        .then((res) => res.json())
        .then((data) => {
          setTask(data);
          const numberOfInputFields = [];
          numberOfInputFields.length = data.subTasks.length;
          numberOfInputFields.fill("");
          setInputFields(numberOfInputFields);
          setSubTasks(data.subTasks);
          console.log(task);
        });
    }
  }, [showUpdate]);

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        title: task.title,
        description: !task?.description ? "" : task.description,
        subTasks: subTasks,
        status: task.status,
      },
      validationSchema: formValidationSchema,
      enableReinitialize: true,
      onSubmit: (values) => {
        fetch(`${API}/tasks/${task._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(values),
        }).then((res) => {
          if (res.status == 200) {
            setShowUpdate(false);
          }
        });
      },
    });

  function addInputField(e) {
    e.preventDefault();
    setInputFields((inputFields) => [...inputFields, ""]);
    setSubTasks((subTasks) => [...subTasks, ""]);
    console.log(subTasks);
  }

  function removeInputField(index, e) {
    console.log(index);
    e.preventDefault();
    const copyInputField = [...inputFields];
    copyInputField.splice(index, 1);
    const subTasksCopy = [...subTasks];
    values.subTasks.splice(index, 1);
    subTasksCopy.splice(index, 1);
    setSubTasks(subTasksCopy);
    setInputFields(copyInputField);
  }

  return (
    <Modal {...props} size="lg" className="addTask_modal_container" centered>
      <Modal.Header className={`${darkMode ? "light" : ""}`} closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body className={`${darkMode ? "light" : ""}`}>
        {task && (
          <form
            onSubmit={handleSubmit}
            className={`addNewTask_form ${darkMode ? "light" : ""}`}
          >
            <div className="addTask_fieldBox">
              <label>Title</label>
              <input
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                name="title"
              />
              <p> {errors.title && touched.title ? errors.title : null}</p>
            </div>
            <div className="addTask_fieldBox">
              <label>Description</label>
              <input
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                name="description"
              />
            </div>
            <div className="addTask_fieldBox">
              <label>SubTasks</label>
              {inputFields.map((input, index) => {
                return (
                  <div className="addSubTask" key={index}>
                    <input
                      name={`subTasks[${index}]`}
                      placeholder="Add SubTasks"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.subTasks[index]}
                      required
                    />
                    <button
                      type="button"
                      onClick={(e) => removeInputField(index, e)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <p>
                      {errors.subTasks && touched.subTasks
                        ? errors.subTasks
                        : null}
                    </p>
                  </div>
                );
              })}
              <button
                className="add_subTask_Btn"
                onClick={addInputField}
                type="button"
              >
                <i className="fa-solid fa-plus"></i> Add Sub Task
              </button>
            </div>
            <div className="addTask_fieldBox">
              <label>Status</label>
              <select
                value={values.status}
                onChange={handleChange}
                onBlur={handleBlur}
                name="status"
                id="status"
              >
                <option value="Todo">Todo</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
              </select>
              <p> {errors.status && touched.status ? errors.status : null}</p>
            </div>
            <button type="submit" className="TaskSubmit_Btn">
              Edit Task
            </button>
          </form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default EditTask;
