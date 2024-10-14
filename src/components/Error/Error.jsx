import styles from "./Error.module.css";

const Error = ({message}) => {
  return <p className={styles.error}>{message}. Please try again later</p>;
};

export default Error;
