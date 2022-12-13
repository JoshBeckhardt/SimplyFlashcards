import React from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route
} from 'react-router-dom';

import * as constants from './constants';
import NavMenu from './components/NavMenu';
import About from './features/about/About';
import Train from './features/train/Train';
import EditDeck from './features/edit-deck/EditDeck';
import DeleteDeck from './features/delete-deck/DeleteDeck';
import CreateDeck from './features/create-deck/CreateDeck';
import Login from './features/login/Login';
import Logout from './features/logout/Logout';
import Signup from './features/signup/Signup';
import RouteChangeListener from './features/route-change-listener/RouteChangeListener';
import {
  selectIsAuthenticated
} from './features/auth/authSlice';

function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <BrowserRouter>
      <RouteChangeListener />
      <NavMenu />
      <Routes>
        <Route path={constants.LOGIN} element={<Login />} />
        <Route path={constants.SIGNUP} element={<Signup />} />
        <Route path={constants.TRAIN} element={<Train />} />
        <Route path={constants.CREATE_DECK} element={<CreateDeck />} />
        <Route path={constants.EDIT_DECK} element={<EditDeck />} />
        <Route path={constants.DELETE_DECK} element={<DeleteDeck />} />
        <Route path={constants.LOGOUT} element={<Logout />} />
        <Route path={constants.ABOUT} element={<About />} />
        <Route path={constants.ROOT} element={<Navigate to={isAuthenticated ? constants.TRAIN : constants.LOGIN} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
