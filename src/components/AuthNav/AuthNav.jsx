import { NavLink } from "react-router-dom";
import styles from "./AuthNav.module.css";

const AuthNav = () => {
  return (
    <nav className={styles.navs}>
      <NavLink className={styles.link} to="/registration">
        Register
      </NavLink>
      <NavLink className={styles.link} to="/login">
        Log In
      </NavLink>
    </nav>
  );
};

export default AuthNav;
