import React, { createContext, useEffect, useState } from "react";
import { API } from "./api";

export const MyContext = createContext("");

const AppContext = ({ children }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [showMobile, setShowMobile] = useState(false);
  const [user, setUser] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [currentTask, setCurrentTask] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
 
  useEffect(() => {

    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
      setIsAuthenticated(true);
    }
    if (isAuthenticated || user) {
      console.log(user);
      fetch(`${API}/users/auth`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          const res = data.isAdmin;
          console.log(res);
          setIsAdmin(res);
        });
    }
  }, [isAuthenticated]);
  console.log(isAdmin);
  return (
    <MyContext.Provider
      value={{
        showAdd,
        setShowAdd,
        showMobile,
        setShowMobile,
        user,
        setUser,
        isAdmin,
        setIsAdmin,
        isAuthenticated,
        setIsAuthenticated,
        setShowTask,
        showTask,
        currentTask,
        setCurrentTask,
        showUpdate,
        setShowUpdate,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default AppContext;
