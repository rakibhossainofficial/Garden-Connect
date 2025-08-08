import { Navigate, Outlet } from "react-router";

const PrivateLayout = () => {
  const user = true;
  const loading = false;
  if (loading) {
    return <div>Loading...</div>; // Y
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateLayout;
