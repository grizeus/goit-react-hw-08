import Button from "../Button/Button";
import styles from "./MainBtn.module.css";

const MainBtn = ({ children }) => {
  return <Button addStyle={styles.main}>{children}</Button>;
};

export default MainBtn;
