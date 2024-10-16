import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLogedIn } from "../redux/auth/selectors";

export const PrivateRoute = ({ component: Component, redirectTo = "/" }) => {
  const isLogedIn = useSelector(selectIsLogedIn);

  return isLogedIn ? Component : <Navigate to={redirectTo} />;
};
