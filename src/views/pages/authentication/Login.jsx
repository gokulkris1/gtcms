import React from "react";
import { Applogo } from "helper/constant";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import AuthActions from "redux/auth/actions";
import enhancer from "./enhancer/LoginFormEnhancer";
import Api from "api/Api";
import { useState } from "react";
import Toaster from "components/common/Toaster";
import { useRef } from "react";
import Button from "components/button/Button";

const { login } = AuthActions;

const Login = props => {
  const toaster = useRef();
  const [loading, setLoading] = useState(false);

  const handleLogin = e => {
    e.preventDefault();
    let { values, handleSubmit, isValid } = props;
    if (isValid) {
      setLoading(true);
      Api.post("/admin/login", {
        email: values.email,
        password: values.password
      })
        .then(res => {
          if (res.data.status) {
            localStorage.setItem("isLogin", true);
            localStorage.setItem("Authorization", res.data.data.accessToken);
            props.login({ token: res.data.data.accessToken });
            setLoading(false);
            props.history.push("/dashboard");
          } else {
            setLoading(false);
            toaster.current.error(res.data.message);
          }
        })
        .catch(error => {
          if (toaster.current)
            toaster.current.error(error.response.data.message);
          setLoading(false);
        });
    }

    handleSubmit();
  };

  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    submitCount
  } = props;

  const loginContainer = {
    background: "#4CBB17",
    position: "fixed",
    overflow: "auto",
    top: 0,
    bottom: 0
  };

  const Error = props => {
    const field1 = props.field;
    if ((errors[field1] && touched[field1]) || submitCount > 0) {
      return (
        <span className={props.class ? props.class : "error-msg"}>
          {errors[field1]}
        </span>
      );
    } else {
      return <span />;
    }
  };

  return (
    <div className="container-fluid" style={loginContainer}>
      <div className="form-container">
        <div className="login-icon">
          <img src={Applogo} alt="icon" height="100px" />
        </div>
        <div className="login-title">Sign in to your account</div>
        <form className="pa-24" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control react-form-input"
              id="email"
              onChange={handleChange}
              value={values.email}
              onBlur={handleBlur}
              placeholder="Email"
            />
            <Error field="email" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control react-form-input"
              id="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Password"
            />
            <Error field="password" />
          </div>

          <Button
            type="submit"
            loading={loading}
            disabled={loading}
            className="c-btn form-button fs-16 demi-bold-text mr-15"
            dataStyle="expand-right"
          >
            Login
          </Button>
          {/* <div
            className="text-center link-label"
            onClick={() => props.history.push("/forgotPassword")}
          >
            Forgot Password ?
          </div> */}
        </form>
      </div>
      <Toaster ref={toaster} />
    </div>
  );
};

export default compose(withRouter, enhancer, connect(null, { login }))(Login);
