import Button from "../Button/Button";
import styles from "./SecondaryBtn.module.css";

const SecondaryBtn = ({ children, actionType = null, ...props }) => {
  const style = actionType === "warning" ? styles.warning : styles.accept;
  return (
    <Button addStyle={style} {...props}>
      {children}
    </Button>
  );
};

export default SecondaryBtn;
