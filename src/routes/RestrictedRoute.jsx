import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { selectIsLogedIn } from "../redux/auth/selectors";

export const RestrictedRoute = ({ component: Component, redirectTo = "/" }) => {
  const isLoggedIn = useSelector(selectIsLogedIn);

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};
