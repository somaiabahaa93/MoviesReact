import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";

export default function Register() {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    age: 0,
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  let navigate = useNavigate();

  function getUserData(eventInfo) {
    let myUser = { ...user };
    myUser[eventInfo.target.name] = eventInfo.target.value;
    setUser(myUser);
    // console.log("event//////", myUser);
  }

  async function sendDataToApi() {
    const url = "http://localhost:3000/api/v1/auth/frontEndSignup";
    let { data } = await axios.post(url, user);

    if (data.message === "success") {
      setIsLoading(false);
      navigate("/login");
    } else {
      setIsLoading(false);
      setError(data.message);
    }
  }

  function submitData(e) {
    e.preventDefault();
    setIsLoading(true);
    let validation = validateRegisterForm();

    if (validation.error) {
      setIsLoading(false);
      setErrors(validation.error.details);
      console.log("vali", validation);
      console.log("errorslist", errors);

      console.log("errors", validation.error.details);
    } else {
      sendDataToApi();
    }
  }

  function validateRegisterForm() {
    const schema = Joi.object({
      first_name: Joi.string().required().min(3).max(10),
      last_name: Joi.string().required(),
      password: Joi.string()
        .required()
        .pattern(/^[A-Z]/),
      email: Joi.string().email({ tlds: { allow: ["com", "net"] } }),
      age: Joi.number().required().min(16).max(80),
    });
    return schema.validate(user, { abortEarly: false });
  }

  return (
    <>
      {/* errors of validation  */}
      {errors.map((err, index) => {
        if (err.context.label === "password") {
          return (
            <div key={index} className="alert alert-danger my-2">
              invalid password
            </div>
          );
        } else {
          return (
            <div key={index} className="alert alert-danger my-2">
              {err.message}
            </div>
          );
        }
      })}
      {/* error of sending data to Api */}
      {error.length > 0 ? (
        <div className="alert alert-danger my-2">{error}</div>
      ) : (
        ""
      )}
      <form onSubmit={submitData}>
        <label htmlFor="first_name">FirstName</label>
        <input
          id="first_name"
          onChange={getUserData}
          className="form-control my-2 my_input"
          name="first_name"
        ></input>
        <label htmlFor="last_name">LastName</label>
        <input
          onChange={getUserData}
          id="last_name"
          className="form-control my-2 my_input"
          name="last_name"
        ></input>
        <label htmlFor="email">Email</label>
        <input
          onChange={getUserData}
          id="email"
          className="form-control my-2 my_input"
          name="email"
          type="email"
        ></input>
        <label htmlFor="password">Password</label>
        <input
          onChange={getUserData}
          id="password"
          className="form-control my-2 my_input"
          name="password"
          type="password"
        ></input>
        <label htmlFor="age">Age</label>
        <input
          onChange={getUserData}
          id="age"
          className="form-control my-2 my_input"
          name="age"
          type="number"
        ></input>
        <button className="btn btn-info">
          {" "}
          {isLoading === true ? (
            <i className="fa fa-spinner fa-spin"></i>
          ) : (
            "Register"
          )}
        </button>
      </form>
    </>
  );
}
