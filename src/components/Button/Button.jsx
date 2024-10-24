import clsx from "clsx";

import styles from "./Button.module.css";

const Button = ({ children, type="submit", onClick=null, disabled = false, addStyle = null }) => {
  return (
    <button
      className={clsx(styles.btn, addStyle)}
      onClick={onClick}
      disabled={disabled}
      type={type}>
      {children}
    </button>
  );
};

export default Button;