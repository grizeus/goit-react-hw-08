import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { selectIsRegistered } from "../redux/auth/selectors";

export const RestrictedRegRoute = ({ component: Component, redirectTo = "/" }) => {
  const isRegistered = useSelector(selectIsRegistered);

  return isRegistered ? <Navigate to={redirectTo} /> : Component;
};
