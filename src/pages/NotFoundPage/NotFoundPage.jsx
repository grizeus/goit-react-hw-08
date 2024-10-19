import Layout from "../../components/Layout/Layout";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <Layout>
      <h1 className={styles.title}>404 - Page Not Found</h1>
    </Layout>
  );
};

export default NotFoundPage;
