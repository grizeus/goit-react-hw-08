import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import clsx from "clsx";

import { selectIsLoggedIn } from "../../redux/auth/selectors";
import styles from "./Navigation.module.css";

const cssClassBuilder = ({ isActive }) =>
  clsx(styles.link, isActive && styles.active);

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav className={styles.navs}>
      <NavLink to="/" className={cssClassBuilder}>
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink to="/contacts" className={cssClassBuilder}>
          Contacts
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
