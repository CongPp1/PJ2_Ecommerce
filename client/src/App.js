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
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from './store/asyncAction';
import FinalRegister from './pages/public/FinalRegister';
import ResetPassword from './pages/public/ResetPassword';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
import Modal from '../src/components/Common/Modal';
import AdminLayout from './pages/admin/AdminLayout';
import ManageOrder from './pages/admin/ManageOrder';
import ManageProduct from './pages/admin/ManageProduct';
import ManageUser from './pages/admin/ManageUser';
import CreatProduct from './pages/admin/CreatProduct';
import MemberLayout from './pages/members/MemberLayout';
import PersonalLayout from './pages/members/PersonalLayout';
import Dashboard from './pages/admin/Dashboard';

function App() {
  const dispatch = useDispatch();
  const { isShowModal, modalChildren } = useSelector(state => state.appReducer);

  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <div className="min-h-screen font-main flex justify-items-center relative">
      {isShowModal && <Modal>{modalChildren}</Modal>}
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE} element={<DetailProduct />} />
          <Route path={path.FAQs} element={<FAQs />} />
          <Route path={path.BLOGS} element={<Blogs />} />
          <Route path={path.OUR_SERVICES} element={<Sevices />} />
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route path={path.ALL} element={<Login />} />
        </Route>
        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.MANAGE_ORDER} element={<ManageOrder />} />
          <Route path={path.MANAGE_PRODUCTS} element={<ManageProduct />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
          <Route path={path.CREATE_PRODUCT} element={<CreatProduct />} />
        </Route>
        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.PERSONAL} element={<PersonalLayout />} />
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
