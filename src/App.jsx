import { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { API } from "./api";
import "./App.css";
import EditTask from "./components/EditTask";
import ForgetPass from "./components/ForgetPass";
import Login from "./components/Login";
import MainBoard from "./components/MainBoard";
import Navbar from "./components/Navbar";
import ResetPass from "./components/ResetPass";
import SignUp from "./components/Signup";
import Subscriptions from "./components/Subscriptions";
import { MyContext } from "./context";

function App() {
  const navigate = useNavigate();
  const { user, setUser, setIsAuthenticated, isAuthenticated } =
    useContext(MyContext);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
      setIsAuthenticated(true);
    } else navigate("/login");
  }, [isAuthenticated]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        {user && <Route path="/" element={<MainBoard />} />}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forget-password" element={<ForgetPass />} />
        <Route path="/reset-password/:id" element={<ResetPass />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
         <Route path="/tasks/edit/:id" element={<EditTask />} /> 
      </Routes>
    </div>
  );
}

export default App;
