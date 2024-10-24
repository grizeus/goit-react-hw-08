import clsx from "clsx";
import styles from "./PageTitle.module.css";

const PageTitle = ({ title, style: additionalStyle = null }) => {
  return <h1 className={clsx(styles.title, additionalStyle)}>{title}</h1>;
};

export default PageTitle;
