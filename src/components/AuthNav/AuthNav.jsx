import { NavLink } from "react-router-dom";
import clsx from "clsx";

import styles from "./AuthNav.module.css";

const cssClassBuilder = ({ isActive }) =>
  clsx(styles.link, isActive && styles.active);

const AuthNav = () => {
  return (
    <nav className={styles.navs}>
      <NavLink className={cssClassBuilder} to="/registration">
        Register
      </NavLink>
      <NavLink className={cssClassBuilder} to="/login">
        Log In
      </NavLink>
    </nav>
  );
};

export default AuthNav;
