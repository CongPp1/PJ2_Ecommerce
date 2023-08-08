import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Public from './pages/public/Public';
import path from './utils/path';

function App() {
  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.HOME} element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
