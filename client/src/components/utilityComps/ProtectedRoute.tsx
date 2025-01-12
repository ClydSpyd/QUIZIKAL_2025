// ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const username = null;

  if(!username) return <Navigate to="/"/>

  return <>{children}</>
};

export default ProtectedRoute;


{/* <Route
  path={"/dashboard"}
  element={
    <ProtectedRoute>
      <Route index element={<HostDash />}/>
    </ProtectedRoute>
  }
/> */}