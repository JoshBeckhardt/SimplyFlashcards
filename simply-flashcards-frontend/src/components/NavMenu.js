import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

import '../css/NavMenu.css';
import * as constants from '../constants';
import * as helpers from '../helpers';
import { selectIsAuthenticated } from '../features/auth/authSlice';

const NavMenuOption = ({
  label,
  isCurrentlySelected
}) => {
  const navigate = useNavigate();

  const classes = ["nav-menu-option"].concat(isCurrentlySelected ? ["nav-menu-option-selected"] : []);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div className={classes.join(" ")}>
      {label}
    </div>
  );
};

const NavMenu = () => {
  const location = useLocation();
  const renderNavMenu = helpers.renderNavMenu(location.pathname);

  return renderNavMenu ? (
    <div id="nav-menu" style={{ width: `${100 - (constants.CONTENT_WIDTH_PERCENT)}%` }}>
      {
        constants.NAV_MENU_OPTIONS.map(option => (
          <Link
            key={option.PATHNAME}
            to={option.PATHNAME}
          >
            <NavMenuOption
              label={option.LABEL}
              isCurrentlySelected={option.PATHNAME === helpers.getMainPath(location.pathname)}
            />
          </Link>
        ))
      }
    </div>
  ) : (
    null
  );
};

export default NavMenu;
