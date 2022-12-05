import React from 'react';
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route
} from 'react-router-dom';

import * as constants from './constants';
import NavMenu from './components/NavMenu';
import Train from './features/train/Train';
import EditDeck from './features/edit-deck/EditDeck';

function App() {
  return (
    <BrowserRouter>
      <NavMenu />
      <Routes>
        <Route path={constants.LOGIN} element={<>abc</>} />
        <Route path={constants.SIGNUP} element={<>abc</>} />
        <Route path={constants.TRAIN} element={<Train />} />
        <Route path={constants.CREATE_DECK} element={<>abc</>} />
        <Route path={constants.EDIT_DECK} element={<EditDeck />} />
        <Route path={constants.SETTINGS} element={<>abc</>} />
        <Route path={constants.ABOUT} element={<>abc</>} />
        <Route path={constants.ROOT} element={<Navigate to={constants.TRAIN} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
