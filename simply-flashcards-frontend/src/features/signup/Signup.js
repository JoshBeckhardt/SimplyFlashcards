import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import {
  register,
  selectAuthLoading,
  selectAuthRejectedReason,
  selectIsAuthenticated
} from '../auth/authSlice';
import * as constants from '../../constants';
import '../../css/Signup.css';
import LoadingSpinner from '../../components/LoadingSpinner';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const authLoading = useSelector(selectAuthLoading);
  const authRejectedReason = useSelector(selectAuthRejectedReason);

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordBorderStyle =
    !confirmPassword || !password ? (
      { borderColor: "black" }
    ) : (
      confirmPassword === password ? (
        { borderColor: "green", borderWidth: ".25rem" }
      ) : (
        { borderColor: "red", borderWidth: ".25rem" }
      )
    );

  const inputError = () => {
    const errorObject = {
      errorText: "",
      disableSubmit: false
    };

    if (!username) {
      return {
        errorText: username === null ? "" : "A username is required.",
        disableSubmit: true
      };
    }
    if (/\s/g.test(username)) {
      return {
        errorText: "Usernames must not contain whitespace.",
        disableSubmit: true
      };
    }
    if (!password) {
      return {
        errorText: password === null ? "" : "A password is required.",
        disableSubmit: true
      };
    }
    if (password !== confirmPassword) {
      return {
        errorText: confirmPassword === null ? "" : "The confirm password field must match the password field.",
        disableSubmit: true
      };
    }

    return errorObject;
  };

  const submit = (e) => {
    e.preventDefault();
    if (inputError().disableSubmit) {
      return;
    }

    dispatch(register({ username, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/${constants.TRAIN}`);
    }
  }, [isAuthenticated]);

  return (
    <div className="signup-container">
      <div className="signup-box">
        {
          authLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <form onSubmit={submit}>
                <div className="signup-title">
                  Sign Up
                </div>
                <div className="signup-text-field">
                  <pre>Username: </pre>
                  <input
                    className="signup-text-box"
                    type="text"
                    value={username === null ? "" : username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div
                  className="signup-text-field"
                  style={passwordBorderStyle}
                >
                  <pre>New Password: </pre>
                  <input
                    className="signup-text-box"
                    type={showPassword ? "text" : "password"}
                    value={password === null ? "" : password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    type="button"
                    value={`${showPassword ? "Hide" : "Show"} Password`}
                    onClick={() => setShowPassword(currentShowPassword => !currentShowPassword)}
                  />
                </div>
                <div
                  className="signup-text-field"
                  style={passwordBorderStyle}
                >
                  <pre>Confirm Password: </pre>
                  <input
                    className="signup-text-box"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword === null ? "" : confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <input
                    type="button"
                    value={`${showConfirmPassword ? "Hide" : "Show"} Password`}
                    onClick={() => setShowConfirmPassword(currentShowConfirmPassword => !currentShowConfirmPassword)}
                  />
                </div>
                <div className="signup-error-text">
                  {authRejectedReason ? authRejectedReason : (inputError().errorText)}
                </div>
                <div>
                  <input
                    className="signup-button"
                    type="submit"
                    value="Sign Up"
                    disabled={authRejectedReason || (inputError().disableSubmit)}
                  />
                </div>
                <Link to={`/${constants.LOGIN}`}>
                  <span className="switch-to-login">
                    Already have an account? Click here to log in.
                  </span>
                </Link>
              </form>
            </>
          )
        }
      </div>
    </div>
  );
};

export default Signup;
