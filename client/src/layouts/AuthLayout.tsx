import { Outlet } from "react-router-dom";
import logo from "assets/images/quizikal_logo1.png";

const AuthLayout = () => {
  return (
    <>
      <div
        className={`flex flex-col items-center justify-start h-screen w-screen absolute top-5`}
      >
        <img className="h-[90px]" src={logo} alt={"logo"} />
        <h4 className="m-0 text-[1.5rem] relative left-[5px] font-[700] grad-text">
          QUIZIKAL
        </h4>
      </div>
      <div className="h-full">
        <Outlet />
      </div>
    </>
  );
};

export default AuthLayout;
