import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./index.css";
import { useAuthContext } from "../../context/authContext";
import { API } from "../../constants";
import { setToken } from "../../helpers";

const Login = () => {
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { setUser } = useAuthContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = document.forms[0];

    if (email.value.trim() === "" || password.value.trim() === "") {
      setErrorMessage("All fields are necessary");
    }

    try {
      setIsLoading(true);
      const values = {
        identifier: email.value,
        password: password.value,
      };
      const response = await fetch(`${API}/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      } else {
        setToken(data.jwt);
        setUser(data.user);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setError(error?.message ?? "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="login-box">
        <div className="illustration-wrapper">
          <img
            src="https://www.pngitem.com/pimgs/m/163-1631356_a-fat-cartoon-man-feasting-on-eating-junk.png"
            alt="Login"
          />
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <p className="form-title">Welcome Back</p>
          <p className="title-description">Login to Foodo</p>
          <p className="error-message">{errorMessage}</p>
          <div className="input-container">
            <label>Email </label>
            <input
              className="login-input"
              type="email"
              name="email"
              placeholder="email"
              required
            />
          </div>
          <div className="input-container">
            <label>Password </label>
            <input
              className="login-input"
              type="password"
              name="password"
              placeholder="password"
              required
            />
          </div>
          <div className="button-container">
            <input type="submit" />
          </div>
          <div className="link-sign-up">
            New to Foodo?{" "}
            <Link className="link" to="/sign-up">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
