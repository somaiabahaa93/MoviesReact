import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
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
    let { data } = await axios.post(
      "https://node-ecomm24.vercel.app/api/v1/auth/frontEndLogin",
      user
    );

    if (data.message === "success") {
      setIsLoading(false);
      localStorage.setItem("userToken", data.token);

      // saveUserData();
      navigate("/");
    } else {
      setIsLoading(false);
      setError(data.message);
    }
  }

  function submitData(e) {
    e.preventDefault();
    setIsLoading(true);
    let validation = validateLoginForm();

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

  function validateLoginForm() {
    const schema = Joi.object({
      password: Joi.string()
        .required()
        .pattern(/^[A-Z]/),
      email: Joi.string().email({ tlds: { allow: ["com", "net"] } }),
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

        <button className="btn btn-info">
          {" "}
          {isLoading === true ? (
            <i className="fa fa-spinner fa-spin"></i>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </>
  );
}
