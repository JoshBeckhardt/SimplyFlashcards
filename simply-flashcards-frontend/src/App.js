import React from 'react';
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route
} from 'react-router-dom';

import * as constants from './constants';
import NavMenu from './components/NavMenu';
import Untracked from './features/untracked/Untracked';

function App() {
  return (
    <BrowserRouter>
      <NavMenu />
      <Routes>
        <Route path={constants.LOGIN} element={<>abc</>} />
        <Route path={constants.SIGNUP} element={<>abc</>} />
        <Route path={constants.TRAIN} element={<>abc</>} />
        <Route path={constants.UNTRACKED} element={<Untracked />} />
        <Route path={constants.CREATE_DECK} element={<>abc</>} />
        <Route path={constants.EDIT_DECK} element={<>abc</>} />
        <Route path={constants.SETTINGS} element={<>abc</>} />
        <Route path={constants.ROOT} element={<Navigate to={constants.UNTRACKED} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
