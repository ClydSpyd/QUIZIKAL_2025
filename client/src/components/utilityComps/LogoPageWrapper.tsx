import { Link } from "react-router-dom";
import logo from "assets/images/quizikal_logo1.png";
import { motion } from "framer-motion";

const LogoPageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen flex flex-col">
      <div className={`flex items-center justify-center w-screen relative`}>
        <Link className={"mt-[20px] flex flex-col items-center"} to={"/"}>
          <img className="h-[90px]" src={logo} alt={"logo"} />
          <h4 className="m-0 text-[1.5rem] relative left-[5px] font-[700] grad-text">
            QUIZIKAL
          </h4>
        </Link>
      </div>
      <div className="box-border w-screen pt-[10%]">
        <motion.div
          key={"dash"}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default LogoPageWrapper;
