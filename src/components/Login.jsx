import { useFormik } from "formik";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { API } from "../api";
import { MyContext } from "../context";

const formValidationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});
const Login = () => {
  const navigate = useNavigate();
  const { user, setUser, setIsAuthenticated } = useContext(MyContext);

  const { values, handleChange, handleBlur, touched, handleSubmit, errors } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: async (values) => {
        const res = await fetch(`${API}/users/login`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const userRes = await res.json();
        console.log(userRes);
        if (res.status == 200 || res.status == 201) {
          setUser(userRes);
          setIsAuthenticated(true);
          localStorage.setItem("user", JSON.stringify(userRes));
          setTimeout(() => navigate("/"), 1000);
        } else {
          alert(userRes.message);
        }
      },
    });
  return (
    <div className="login_formContainer">
      <form onSubmit={handleSubmit}>
        <div className="fieldBox">
          <label>Email</label>
          <input
            type="text"
            placeholder="Enter your email"
            onChange={handleChange}
            value={values.email}
            onBlur={handleBlur}
            name="email"
          />
          <p> {errors.email && touched.email ? errors.email : null}</p>
        </div>
        <div className="fieldBox">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            name="password"
          />
          <p> {errors.password && touched.password ? errors.password : null}</p>
          <p className="forget_pass">
            <Link
              style={{ textDecoration: "none", color: "#635FC7" }}
              to="/forget-password"
            >
              Forget Password?
            </Link>
          </p>
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        <Link style={{ textDecoration: "none", color: "#635FC7" }} to="/signup">
          Don't have an account? Click Here!
        </Link>
      </p>
    </div>
  );
};

export default Login;
