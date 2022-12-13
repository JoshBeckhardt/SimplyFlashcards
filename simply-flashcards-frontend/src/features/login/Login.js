import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import {
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthRejectedReason,
  login
} from '../auth/authSlice';
import * as constants from '../../constants';
import '../../css/Login.css';
import LoadingSpinner from '../../components/LoadingSpinner';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const authLoading = useSelector(selectAuthLoading);
  const authRejectedReason = useSelector(selectAuthRejectedReason);

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const submit = (e) => {
    e.preventDefault();

    dispatch(login({ username, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/${constants.TRAIN}`);
    }
  }, [isAuthenticated]);

  return (
    <div className="login-container">
      <div className="login-box">
        {
          authLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <form onSubmit={submit}>
                <div className="login-title">
                  Log In
                </div>
                <div className="login-text-field">
                  <pre>Username: </pre>
                  <input
                    className="login-text-box"
                    type="text"
                    value={username === null ? "" : username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="login-text-field">
                  <pre>Password: </pre>
                  <input
                    className="login-text-box"
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
                <div className="login-error-text">
                  {authRejectedReason ? authRejectedReason : ""}
                </div>
                <div>
                  <input
                    className="login-button"
                    type="submit"
                    value="Log In"
                  />
                </div>
                <Link to={`/${constants.SIGNUP}`}>
                  <span className="switch-to-signup">
                    No account? Click here to sign up.
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

export default Login;
