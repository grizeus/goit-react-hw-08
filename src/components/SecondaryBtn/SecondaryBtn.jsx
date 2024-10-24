import Button from "../Button/Button";
import styles from "./SecondaryBtn.module.css";

const SecondaryBtn = ({ children, isBroad=false, actionType = null, ...props }) => {
  const style = actionType === "warning" ? styles.warning : styles.accept;
  return (
    <Button addStyle={[style, styles.btn, isBroad && styles.broad]} {...props}>
      {children}
    </Button>
  );
};

export default SecondaryBtn;
