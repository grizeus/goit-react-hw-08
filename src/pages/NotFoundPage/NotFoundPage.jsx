import PageTitle from "../../components/PageTitle/PageTitle";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return <PageTitle style={styles.title} title={"404 - Page Not Found"} />;
};

export default NotFoundPage;
