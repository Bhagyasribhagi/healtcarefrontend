
import Cookies from "js-cookie";

import { useNavigate } from "react-router-dom";

import "./index.css";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const onSubmitLogout = () => {
    Cookies.remove("jwtToken");
    console.log("logout");

    navigate("/login");
  };

  return (
    <div className="logout">
      <img
        src="https://res.cloudinary.com/dwc2npg5b/image/upload/v1723618344/1600w-fSbVHMz-u48_umhyzu.webp"
        className="logo-i"
        alt="Healthcare Management System Logo"
      />

      <h2 className="admin-hello">
        Hello, Welcome to Our <span className="span1">Health care</span>
      </h2>
      <div className="admin-logout">
        <button type="button" className="logout-btn" onClick={onSubmitLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};
export default Header;
