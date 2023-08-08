import logo from "../assets/logo_digital_new_250x.png";
import icons from "../utils/icons.js";
import path from "../utils/path";
import { Link } from "react-router-dom";

const Header = () => {
  const { RiPhoneFill, MdEmail, BsHandbagFill, FaUserCircle } = icons;

  return (
    <div className="border w-main flex justify-between h-[110px] py-[35px]">
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
            <span className="font-semibold">(+1800) 000 8808</span>
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
        <div className="flex items-center justify-center gap-2 px-6 border-r">
          <BsHandbagFill color="red" />
          <span>0 item(s)</span>
        </div>
        <div className="flex items-center justify-center gap-2 px-6">
          <FaUserCircle color="red" size={24} />
        </div>
      </div>
    </div>
  );
};

export default Header;
