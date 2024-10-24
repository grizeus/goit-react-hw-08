import { useDispatch, useSelector } from "react-redux";

import { logOut } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";
import styles from "./UserMenu.module.css";
import SecondaryBtn from "../SecondaryBtn/SecondaryBtn";

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.username}>{user.name}</p>
      <SecondaryBtn actionType="warning" onClick={handleLogout}>Logout</SecondaryBtn>
      
    </div>
  );
};

export default UserMenu;
