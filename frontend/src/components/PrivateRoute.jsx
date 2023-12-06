import { useSelector } from "react-redux";
import { Navigate,Outlet } from "react-router";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return <>{userInfo ? <Outlet></Outlet> : <Navigate to='/login'></Navigate>}</>
}
export default PrivateRoute
