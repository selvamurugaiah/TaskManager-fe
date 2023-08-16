import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";

const ForgetPass = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API}/users/forget-password`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    console.log(res);
    const data = await res.json();
    if (res.status == 200) {
      navigate(`/reset-password/${data.user._id}`);
    }
  };
  return (
    <div className="forget_form_cont">
      <form className="forget_form">
        <h3>Forget Password</h3>
        <div className="fieldBox">
          <label>Enter Registered Email for Verification</label>
          <input
            type="text"
            value={email}
            name="username"
            className="forget_pass"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="add_Btn_header" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgetPass;
