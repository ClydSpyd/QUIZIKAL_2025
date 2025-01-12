import { Link, Outlet } from "react-router-dom";
import logo from "assets/images/quizikal_logo1.png";
import { TbLogin2,TbLogout2 } from "react-icons/tb";
import { useAuth } from "@/context/authContext";

const LogoLayout = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <div className={`topBar`}>
        <Link className={"logoContainer"} to={"/"}>
          <img className="mainLogo" src={logo} alt={"logo"} />
          <h4 className="logo-text">QUIZIKAL</h4>
        </Link>
        {user?.username && (
          <button onClick={logout}>
            Logout
            <TbLogout2 />
          </button>
        )}
        {location.pathname === "/" && (
          <Link className={`login`} to={"/login"}>
            Host Login
            <TbLogin2 />
          </Link>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default LogoLayout