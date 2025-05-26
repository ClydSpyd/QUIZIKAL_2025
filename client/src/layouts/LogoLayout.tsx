import { Link, Outlet } from "react-router-dom";
import logo from "assets/images/quizikal_logo1.png";
import { TbLogout2 } from "react-icons/tb";
import { useAuth } from "@/context/authContext";

const LogoLayout = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <div
        className={`flex items-center justify-center w-screen relative mb-4`}
      >
        <Link className={"mt-[20px] flex flex-col items-center"} to={"/"}>
          <img className="h-[90px]" src={logo} alt={"logo"} />
          <h4 className="m-0 text-[1.5rem] relative left-[5px] font-[700] grad-text">
            QUIZIKAL
          </h4>
        </Link>
        <div className="h-fit w-full flex justify-end px-4 absolute top-4 z-20">
          {user?.username && (
            <button
              onClick={logout}
              className={`flex items-center gap-[2px] right-5 text-sm px-4 py-2  rounded-md border`}
            >
              Logout
              <TbLogout2 />
            </button>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default LogoLayout;
