import React, { Component, FormEvent, ChangeEvent } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

interface SignUpState {
  admin_name: string;
  username: string;
  password: string;
  confirmPassword: string;
  errMsg: string;
  isError: boolean;
  passwordType: string;
  role:string;
}

class Signup extends Component {
  state: SignUpState = {
    admin_name: "",
    username: "",
    password: "",
    confirmPassword: "",
    errMsg: "",
    isError: false,
    passwordType: "password",
    role:""
  };

  submitSuccess = (jwtToken: string) => {
    Cookies.set("jwt_token", jwtToken, { expires: 30 });
    window.location.replace("/login"); // Redirect to home after sign up
  };

  submitFailure = (errMsg: string) => {
    this.setState({ errMsg, isError: true });
  };

  onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { admin_name, username, password, confirmPassword } = this.state;

    // Check if passwords match
    if (password !== confirmPassword) {
      this.submitFailure("Passwords do not match");
      return;
    }

    const userDetails = { admin_name, username, password };
    console.log(userDetails);

    const url = "https://healthcarebackendproject.onrender.com/register"; // Replace with your sign-up endpoint
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        this.submitSuccess(data.jwt_token);
      } else {
        this.submitFailure(data.error_msg);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      this.submitFailure("Failed to sign up. Please try again later.");
    }
  };

  onClickCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    this.setState({
      passwordType: checked ? "text" : "password",
    });
  };

  onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ admin_name: e.target.value });
  };

  onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: e.target.value });
  };

  onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: e.target.value });
  };

  onChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ confirmPassword: e.target.value });
  };
   onChangingRole = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({role:event.target.value});
}

  render() {
    const {
      admin_name,
      username,
      password,
      confirmPassword,
      passwordType,
      errMsg,
      isError,role
    } = this.state;

    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken) {
      return <Navigate to="/home" />;
    }

    return (
      <div className="signup-bg">
        
        <div className="body-bg">
          <form onSubmit={this.onSubmitForm} className="form-submit1">
            <div className="signup">
              <input
                className="user-name1"
                type="text"
                placeholder="FullName"
                name="fullname"
                value={admin_name}
                onChange={this.onChangeUsername}
              />
              <br />

              <input
                className="email"
                type="email"
                placeholder="Email"
                name="username"
                value={username}
                onChange={this.onChangeEmail}
              />
              <br />

              <input
                className="password1"
                type={passwordType}
                placeholder="Password"
                name="password"
                value={password}
                onChange={this.onChangePassword}
              />
              <br />

              <input
                className="confirm-password"
                type={passwordType}
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={this.onChangeConfirmPassword}
              />
              <br />
              <div className="input-el-and-label-container">
                    <label className="label" htmlFor="role">Role:</label><br />
                    <select value={role} className="role-element" onChange={this.onChangingRole}>
                        <option value="ADMIN">ADMIN</option>
                    </select>
                </div>

              <div className="show-pass">
                <input
                  type="checkbox"
                  id="showPsd"
                  className="check-box"
                  onChange={this.onClickCheckBox}
                />
                <label className="show-password" htmlFor="showPsd">
                  Show Password
                </label>
              </div>
              <br />

              <div className="enter1">
                <button type="submit" className="submit_btn1">
                  Sign Up
                </button>
              </div>
              {isError && <p className="errorMsg1">{errMsg}</p>}
              <p className="sign-in1">
                Already have an account? <a href="/login">Sign in</a>
              </p>
            </div>
          </form>

         
        </div>
      </div>
    );
  }
}

export default Signup;
