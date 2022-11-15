import * as constants from './constants';

export const getMainPath = (pathname) => {
  const pathArray = pathname.split("/");

  if (pathArray.length < 2) {
    return "";
  }

  return pathArray[1];
};

export const renderNavMenu = (pathname) => {
  const mainPath = getMainPath(pathname);

  return mainPath !== constants.LOGIN && mainPath !== constants.SIGNUP;
};
