import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/authContext";

const ProtectedLayout = () => {

  const {user} = useAuth();
  console.log({user})
  return user ? <Outlet /> : <Navigate to="/" />
};

export default ProtectedLayout;
