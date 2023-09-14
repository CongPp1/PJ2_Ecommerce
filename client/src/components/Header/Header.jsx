import { Fragment, memo } from "react";
import logo from "../../assets/logo_digital_new_250x.png";
import icons from "../../utils/icons";
import path from "../../utils/path";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { RiPhoneFill, MdEmail, BsHandbagFill, FaUserCircle } = icons;
  const { current } = useSelector(state => state.userReducer);

  return (
    <div className="border-b w-main flex justify-between h-[110px] py-[35px]">
      <div>
        <Link to={`/${path.HOME}`}>
          <img
            src={logo}
            alt="logo_digital_new_250x.png"
            className="w-[234px] object-contain"
          />
        </Link>
      </div>
      <div className="flex text-[13px]">
        <div className="flex flex-col items-center px-6 border-r">
          <span className="flex gap-1 items-center">
            <RiPhoneFill color="red" />
            <span className="font-semibold">0772244726</span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>
        <div className="flex flex-col items-center px-6 border-r">
          <span className="flex gap-1 items-center">
            <MdEmail color="red" />
            <span className="font-semibold"> trancongdev1512@gmail.com</span>
          </span>
          <span>Online Support 24/7</span>
        </div>
        {current && (
          <Fragment>
            <div className="flex items-center justify-center gap-2 px-6 border-r cursor-pointer">
              <BsHandbagFill color="red" />
              <span>0 item(s)</span>
            </div>
            <Link
              className="flex items-center justify-center gap-2 px-6 cursor-pointer"
              to={current?.role === 'admin' ? `/${path.ADMIN}/${path.DASHBOARD}` : `/${path.MEMBER}/${path.PERSONAL}`}
            >
              <FaUserCircle color="red" size={24} />
              <span>Profile</span>
            </Link>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default memo(Header);
