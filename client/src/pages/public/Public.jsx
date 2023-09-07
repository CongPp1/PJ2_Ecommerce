import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import TopHeader from "../../components/Header/TopHeader";
import Footer from "../../components/Footer/Footer";
import { memo } from "react";

const Public = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <TopHeader />
      <Header />
      <Navigation />
      <div className="w-main">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default memo(Public);
