import { TailSpin } from "react-loader-spinner";
import styles from "./Loader.module.css";

const SPINNER_COLOR = "#4e75ff";

const Loader = () => {
  return (
    <div className={styles.wrapper}>
      <TailSpin color={SPINNER_COLOR} />
    </div>
  );
};

export default Loader;
