import { useIsAuthenticated } from "react-auth-kit-v2";
import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = useIsAuthenticated();
  if (isAuthenticated === null) return <span>Authenticating</span>;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthLayout;
