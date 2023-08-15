import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Public from './pages/public/Public';
import path from './utils/path';
import { useDispatch } from 'react-redux';
import { getCategories } from './store/asyncAction';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <div className="min-h-screen font-main flex justify-center">
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
