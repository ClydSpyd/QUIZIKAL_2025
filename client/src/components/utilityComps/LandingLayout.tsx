import { motion } from "framer-motion";
import { TbLogin2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import { MdGroups } from "react-icons/md";


export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="h-fit w-full flex justify-end px-4 absolute top-4 z-20">
        {location.pathname === "/" ? (
          <Link to={"/login"}>
            <button
              className={`flex items-center gap-[2px] text-sm px-4 py-2 rounded-md border`}
            >
              Host Login
              <TbLogin2 />
            </button>
          </Link>
        ) : (
          <Link to={"/"}>
            <button
              className={`flex items-center gap-[2px] text-sm px-4 py-2 rounded-md border`}
            >
              Join Session
              <MdGroups />
            </button>
          </Link>
        )}
      </div>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="w-screen h-full min-h-[600px] gap-4 flex flex-col items-center justify-center pb-[10vh] relative"
      >
        {children}
      </motion.div>
    </>
  );
}
