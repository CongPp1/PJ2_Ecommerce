import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Public from './pages/public/Public';
import DetailProduct from './pages/public/DetailProduct';
import FAQs from './pages/public/FAQs';
import Blogs from './pages/public/Blogs';
import Sevices from './pages/public/Sevices';
import Products from './pages/public/Products';
import path from './utils/path';
import { useDispatch } from 'react-redux';
import { getCategories } from './store/asyncAction';
import FinalRegister from './pages/public/FinalRegister';
import ResetPassword from './pages/public/ResetPassword';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <div className="min-h-screen font-main flex justify-items-center">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE} element={<DetailProduct />} />
          <Route path={path.FAQs} element={<FAQs />} />
          <Route path={path.BLOGS} element={<Blogs />} />
          <Route path={path.OUR_SERVICES} element={<Sevices />} />
          <Route path={path.PRODUCTS} element={<Products />} />
        </Route>
        <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
        <Route path={path.LOGIN} element={<Login />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
