import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { selectIsLoggedIn, selectIsRegistered } from "../redux/auth/selectors";

export const RestrictedLogRoute = ({ component: Component, redirectTo = "/" }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};
