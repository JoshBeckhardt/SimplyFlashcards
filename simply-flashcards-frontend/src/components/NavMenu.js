import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import '../css/NavMenu.css';
import * as constants from '../constants';
import * as helpers from '../helpers';

const NavMenuOption = ({
  label,
  isCurrentlySelected
}) => {
  const classes = ["nav-menu-option"].concat(isCurrentlySelected ? ["nav-menu-option-selected"] : []);

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
