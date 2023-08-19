import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import { memo } from "react";

const Public = () => {
  return (
    <div className="w-full flex flex-col justify-items-center">
      <Header />
      <Navigation />
      {console.log('[Debug] da chay vao day')}
      <div className="w-main">
        <Outlet />
      </div>
    </div>
  );
};

export default memo(Public);
