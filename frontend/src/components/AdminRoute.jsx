import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      {userInfo && userInfo.isAdmin ? (
        <Outlet></Outlet>
      ) : (
        <Navigate to="/login" replace></Navigate>
      )}
    </>
  );
};
export default AdminRoute;
