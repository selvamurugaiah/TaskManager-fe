import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../context";
import { API } from "../api";
const formValidationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});
const SignUp = () => {
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
        const res = await fetch(`${API}/users/signup`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const userRes = await res.json();
        if (res.status == 200 || res.status == 201) {
          setUser(userRes);
          setIsAuthenticated(true);
          localStorage.setItem("user", JSON.stringify(userRes));
          console.log(userRes);
          navigate("/");
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
            onBlur={handleBlur}
            value={values.email}
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
        </div>

        <button type="submit">SignUp</button>
      </form>
      <p>
        <Link style={{ textDecoration: "none", color: "#635FC7" }} to="/login">
          Already have an account? Login
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
